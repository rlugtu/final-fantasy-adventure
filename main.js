
// Screen divs 
const mapScreen = document.querySelector(".map")
const battleScreen = document.querySelector(".battle-screen")
const shopScreen = document.querySelector(".shop")


// SCREEN TOGGLES 
const mapToggle = document.querySelector("#map-toggle")
const battleToggle = document.querySelector('#battle-toggle')
const shopToggle = document.querySelector('#shop-toggle')

const switchToMap = () => {
    mapScreen.classList.remove('inactive')
    battleScreen.classList.add('inactive')
    shopScreen.classList.add('inactive')
}

const switchToBattle = () => {
    mapScreen.classList.add('inactive')
    battleScreen.classList.remove('inactive')
    shopScreen.classList.add('inactive')
}

// BUTTONS JUST FOR TESTING
mapToggle.addEventListener('click', () => {
    mapScreen.classList.remove('inactive')
    battleScreen.classList.add('inactive')
    shopScreen.classList.add('inactive')
})
battleToggle.addEventListener('click', () => {
    mapScreen.classList.add('inactive')
    battleScreen.classList.remove('inactive')
    shopScreen.classList.add('inactive')
})
shopToggle.addEventListener('click', () => {
    mapScreen.classList.add('inactive')
    battleScreen.classList.add('inactive')
    shopScreen.classList.remove('inactive')
})



// MAP EVENT LISTENERS
// MOVING CHARACTER
window.addEventListener("keydown", (e) => {
    let playerIconMap = document.querySelector('.player-icon-map')
    // key up
    if(e.keyCode == "38" ) {
        console.log('up')
        playerIconMap.style.marginTop = playerIconMap.style.marginTop - 20 + 'px';
    }
    //key down
    else if(e.keyCode =="40") {
        console.log('down')
        playerIconMap.style.marginTop = playerIconMap.style.marginTop + 20 + 'px';
    }
    // key left
    else if(e.keyCode =="37") {
        console.log('left')
    }

    // key right
    else if(e.keyCode == "39") {
        console.log('right')
    }
});

const sixHeadDragonMapIcon = document.querySelector('#sixHeadedDragon')
const snakeBladesMapIcon = document.querySelector('#snakeBlades')
const skullsMapIcon = document.querySelector('#skulls')
sixHeadDragonMapIcon.addEventListener('click', () => {
    fight(sixHeadDragon)
    switchToBattle()
    }
)
snakeBladesMapIcon.addEventListener('click', () => {
    fight(snakeBlades)
    switchToBattle()
})
skullsMapIcon.addEventListener('click', () => {
    fight(skulls)
    switchToBattle()
})




// Battle SYSTEM + event listeners
// DIALOGUE BOXES
let enemyInfo = document.querySelector('#enemyInfo')
let actionsDialogue = document.querySelector('#dialogueActions')
let playerHealth = document.querySelector('.playerHealth')

// win condition
const winCondition = (enemy) => {
    if(enemy.health <= 0) {
        actionsDialogue.innerText = `You defeated the ${enemy.name}!`
        setTimeout(function() {
           switchToMap() 
        }, 6000)
        return true
    }
    return false
}
// lost condition
const loseCondition = (player) => {
    if(player.health <= 0) {
        switchToMap()
        console.log(cloud.health)
        alert('You Died')
        cloud.health = 1
    }
}


// attack button
const attackButton = document.querySelector('#attack')
// attack animation class
const attackAnimation = document.querySelector('.attack-animation')
const attack = (enemy) => {
    attackButton.addEventListener('click', () => {
        setTimeout(function() {
            attackAnimation.classList.remove('attack-off')
        }, 1000)
        
        setTimeout(function() {
            attackAnimation.classList.add('attack-off')
        }, 3000) 
        let playerIcon = document.querySelector('.player-icon')
        setTimeout(function() {
            playerIcon.classList.add('attackMove')
        },300)
        setTimeout(function() {
            playerIcon.classList.remove('attackMove')
        },1300)
        loseCondition(cloud)
        let damageDone = cloud.cloudAttack()
        actionsDialogue.innerText = `You dealt ${damageDone} damage!`
        enemy.health -= damageDone
        enemyInfo.innerText = `${enemy.name} \n Health: ${enemy.health}`
        winCondition(enemy)
        console.log(winCondition(enemy))
        // if the enemy isnt dead let them attack
        if(winCondition(enemy) === false ) {
            // ENEMY TURN
            //enemy move animation
            let enemyIcon = document.querySelector('.enemy-icon')
            setTimeout(function() {
                enemyIcon.classList.add('enemyAttack')
            },4500)
            setTimeout(function() {
                enemyIcon.classList.remove('enemyAttack')
            },5500)
            //enemy attack
            setTimeout(function() {
                let damageTaken = enemyTurn(enemy)
                actionsDialogue.innerText = `You took ${damageTaken} damage!`
                playerHealth.innerText = `Health: ${cloud.health}`
            },5500)
        }
    })
}


// item button
const itemOption = document.querySelector('#item')
let allOptions = document.querySelector('.player-options')

const items = () => {
    itemOption.addEventListener('click', () => {
        let inventory = document.querySelector('.inventory')
        allOptions.classList.add('off')
        inventory.classList.remove('off')
    })
    // open inventory after item button is clicked
    const backButton = document.querySelector('#backButton')
    
    backButton.addEventListener('click', () => {
        let inventory = document.querySelector('.inventory')
        allOptions.classList.remove('off')
        inventory.classList.add('off')
    })
}

// HEAL FUNCTION
const healFunction = () => {
    let healAnimation = document.querySelector('.heal-animation')
        setTimeout(function() {
            healAnimation.classList.remove('heal-off')
        }, 500)
        setTimeout(function() {
            healAnimation.classList.add('heal-off')
        }, 3500)
}
healFunction()




// steal button
const battleMoney = document.querySelector('#battleMoney')
const stealOption = document.querySelector('#steal')
const steal = (enemy) => {
    stealOption.addEventListener('click', () => {
        let playerIcon = document.querySelector('.player-icon')
        setTimeout(function() {
            playerIcon.classList.add('steal')
        }, 500)
        setTimeout(function() {
            playerIcon.classList.remove('steal')
        }, 3000)
        // steal and dialogue for amount stolen 
        let stolen = cloud.cloudSteal(enemy)
        actionsDialogue.innerText = `You stole ${stolen} gil!`        
        // show money in options box 
        battleMoney.innerText = `Gil: ${cloud.money}`
        console.log(winCondition(enemy))
        // if the enemy isnt dead let them attack
        if(winCondition(enemy) === false ) {
            // ENEMY TURN
            //enemy move animation
            let enemyIcon = document.querySelector('.enemy-icon')
            setTimeout(function() {
                enemyIcon.classList.add('enemyAttack')
            },4500)
            setTimeout(function() {
                enemyIcon.classList.remove('enemyAttack')
            },5500)
            //enemy attack
            setTimeout(function() {
                let damageTaken = enemyTurn(enemy)
                actionsDialogue.innerText = `You took ${damageTaken} damage!`
                playerHealth.innerText = `Health: ${cloud.health}`
            },5500)
        }
    })
}


// run button
const runOption = document.querySelector('#run')
const run = () => {
    runOption.addEventListener('click', () => {
        let playerIcon = document.querySelector('.player-icon')
        setTimeout(function() {
            playerIcon.classList.add('run')
        },500)
        setTimeout(function() {
            playerIcon.classList.remove('run')
        },4000)
        setTimeout(function () {
            mapScreen.classList.remove('inactive')
            battleScreen.classList.add('inactive')
            shopScreen.classList.add('inactive')
        },3500)
    })
}


// SHOP EVENT LISTENERS 

// BACK BUTTON
const shopBackButton = document.querySelector('#shopBack')
shopBackButton.addEventListener('click', () => {
    mapScreen.classList.remove('inactive')
    battleScreen.classList.add('inactive')
    shopScreen.classList.add('inactive')
})




// ENEMIES

class Enemy {
    constructor(name, health, attack,money) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.money = money;
        this.maxHealth = health
    }
    enemyAttack() {
        // return a random number from the range of damages the monster can make
        return this.attack[Math.floor(Math.random()*this.attack.length)]
    }
    enemyHealthRegen() {
        this.health = this.maxHealth
    }
} 

const sixHeadDragon = new Enemy('6 Headed Dragon', 10, [1,2,3,4,5], [5,5,10,10,15,50])
sixHeadDragon.url = './images/monster-1.png '

const snakeBlades =new Enemy('Snake Blades', 20, [5,5,5,10,10,15,15,20,20,30], [5,5,5,10,10,10,20,20,30,80])
snakeBlades.url = './images/snakeBlades.png'

const skulls = new Enemy('Skulls', 30, [10,10,10,15,15,15,25,25,50], [10,10,10,15,15,25,25,50,100])
skulls.url = './images/skulls.png'

// CLOUD
const cloud = {
    name: 'Cloud',
    attack: [1,2,3,4,5],
    health: 100,
    money: 0,

    cloudAttack() {
        return(this.attack[Math.floor(Math.random()*this.attack.length)])
    },

    cloudSteal(enemy) {
        // add to clouds money a random number from the enemy money array 
        let moneyStolen = enemy.money[Math.floor(Math.random()*enemy.money.length)]
        this.money += moneyStolen
        return moneyStolen
        
    } 
}


// fight sequence
const playerOptions = (enemy) => {
    attack(enemy)
    items()
    steal(enemy)
    run()
}

// enemy attack 
const enemyTurn = (enemy) => {
    let damageTaken = enemy.enemyAttack()
    cloud.health -= damageTaken
    console.log(cloud.health)
    return damageTaken
}


let enemyIcon = document.querySelector('.enemy-icon')
const fight = (enemy) => {
    // change the Enemy Icon based on Monster
    enemyIcon.style.backgroundImage = `url('${enemy.url}')`
    if(enemy.health > 0) {
        enemyInfo.innerText = `${enemy.name} \n Health: ${enemy.health}`
        playerHealth.innerText = `Health: ${cloud.health}`
        playerOptions(enemy)
    }
}

// let enemyIcon = document.querySelector('#enemy-con')

