// ENEMIES
class Enemy {
    constructor(name, health, attack,money,bounty) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.money = money;
        this.maxHealth = health;
        this.bounty = bounty;
        this.hasWon = false
    }
    enemyAttack() {
        // return a random number from the range of damages the monster can make
        return this.attack[Math.floor(Math.random()*this.attack.length)]
    }
    enemyHealthRegen() {
        this.health = this.maxHealth
    }
} 
const sixHeadDragon = new Enemy('6 Headed Dragon', 1, [1,2,3,4,5], [5,5,10,10,15,50],30)
sixHeadDragon.url = './images/monster-1.png '
const snakeBlades =new Enemy('Snake Blades', 5, [5,5,5,10,10,15,15,20,20,30], [5,5,5,10,10,10,20,20,30,80],50)
snakeBlades.url = './images/snakeBlades.png'
const skulls = new Enemy('Skulls', 30, [10,10,10,15,15,15,25,25,40], [10,10,10,15,15,25,25,50,100],80)
skulls.url = './images/skulls.png'
const hornDemon = new Enemy('Horn Demon', 50, [15,15,15,20,20,30,35,50,50], [20,20,30,30,40,50,70,150],100)
hornDemon.url = './images/hornDemon.png'
const cactuar = new Enemy('Cactuar', 100, [20,20,20,30,30,40,50,70], [0],0)
cactuar.url = './images/cactuar.png'
// CLOUD
const cloud = {
    name: 'Cloud',
    attack: [1,2,3,4,5],
    health: 100,
    money: 200,
    potion: 1,
    hiPotion: 1,
    megaPotion: 1,
    hasBusterSword: false,

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

// SOUNDS
let mainMenuSound = new Audio('./sounds/mainMenuSound.mp3')
let battleMusic = new Audio('./sounds/battleMusic.mp3')
let winSound = new Audio('./sounds/battleWin.mp3')
let buttonSound = new Audio('./sounds/buttonSound.mp3')
let shopMusic = new Audio('./sounds/shopMusic.mp3')
let mapMusic = new Audio('./sounds/mapMusic.mp3')
let enemyDamageSound = new Audio('./sounds/enemyDamageSound.mp3')
let healSound = new Audio('./sounds/healSound.mp3')
let cloudAttackSound = new Audio('./sounds/cloudAttackSound.mp3')

let sound = document.querySelectorAll('.sound')
sound.forEach(button => {
    button.addEventListener('mouseover', (e) => {
        buttonSound.play();
    })
    button.addEventListener('mouseout', (e) => {
        buttonSound.pause();
        buttonSound.currentTime = 0;
    })
})

let soundToggle = document.querySelector('#soundToggle')
soundToggle.addEventListener('click', () => {
    mainMenuSound.pause()
    shopMusic.pause()
    mapMusic.pause()
})


// SCREEN TOGGLES 
const mapScreen = document.querySelector(".map")
const battleScreen = document.querySelector(".battle-screen")
const shopScreen = document.querySelector(".shop")
const startScreen = document.querySelector('.startScreen')
//play music on load
window.onload = mainMenuSound.play()
const mapToggle = document.querySelector("#map-toggle")
const battleToggle = document.querySelector('#battle-toggle')
const shopToggle = document.querySelector('#shop-toggle')
const switchToMap = () => {
    mapMusic.play()
    shopMusic.pause()
    battleMusic.pause()
    testDelete()
    if(cactuar.hasWon) {
        alert('YOU WON!')
        location.reload()
    }
    startScreen.classList.add('inactive')
    mapScreen.classList.remove('inactive')
    battleScreen.classList.add('inactive')
    shopScreen.classList.add('inactive')
    updateMapInventory()
    updateMapHealth()
    return
}

const switchToBattle = () => {
    mapMusic.pause()
    shopMusic.pause()
    battleMusic.currentTime = 0;
    battleMusic.play()
    battleMoney.innerText = `Gil: ${cloud.money}`
    startScreen.classList.add('inactive')
    mapScreen.classList.add('inactive')
    battleScreen.classList.remove('inactive')
    shopScreen.classList.add('inactive')
    
    return
}

const switchToShop = () => {
    shopMusic.play()
    mapMusic.pause()
    battleMusic.pause()
    shopPotion.innerText = `Potion ${cloud.potion}`
    hiPotion.innerText = `Hi-Potion ${cloud.hiPotion}`
    megaPotion.innerText = `MegaPotion ${cloud.megaPotion}`
    startScreen.classList.add('inactive')
    updateShopMoney()
    mapScreen.classList.add('inactive')
    battleScreen.classList.add('inactive')
    shopScreen.classList.remove('inactive')
    return
}

//START BUTTON && START OVER 
const startButton = document.querySelector('#startButton')
startButton.addEventListener('click', () => {
    mainMenuSound.pause()
    switchToMap()
})
const startOver = document.querySelector('#startOver')
startOver.addEventListener('click', () => {
    location.reload();
})

// BUTTONS JUST FOR TESTING
mapToggle.addEventListener('click', switchToMap)
battleToggle.addEventListener('click', switchToBattle)
shopToggle.addEventListener('click', switchToShop)


// SHOP OPTIONS AND EVENT LISTENERS
const itemsCost = {
    potion: 5,
    hiPotion: 10,
    megaPotion: 20,
    busterSword: 100,
}
const potionHeals = {
    potion: 10,
    hiPotion: 20,
    megaPotion: 40,
}

let shopPotion = document.querySelector('.potion')
let hiPotion = document.querySelector('.hiPotion')
let megaPotion = document.querySelector('.megaPotion')
let busterSword = document.querySelector('.busterSword')

shopPotion.addEventListener('click', () => {
    if(itemsCost.potion < cloud.money) {
        cloud.potion++
        cloud.money -= itemsCost.potion
        shopPotion.innerText = `Potion ${cloud.potion}`
        updateShopMoney()
    }
    else {
        alert('not enough money')
    }
})
hiPotion.addEventListener('click', () => {
    if(itemsCost.hiPotion < cloud.money) {
        cloud.hiPotion++
        cloud.money -= itemsCost.hiPotion
        hiPotion.innerText = `Hi-Potion ${cloud.hiPotion}`
        updateShopMoney()
    }
    else {
        alert('not enough money')
    }
})
megaPotion.addEventListener('click', () => {
    if(itemsCost.megaPotion < cloud.money) {
        cloud.megaPotion++
        cloud.money -= itemsCost.megaPotion
        megaPotion.innerText = `MegaPotion ${cloud.megaPotion}`
        updateShopMoney()
    }
    else {
        alert('not enough money')
    }
})
busterSword.addEventListener('click', () => {
    if(itemsCost.busterSword < cloud.money) {
        cloud.hasBusterSword = true
        cloud.attack = [10,10,10,20,20,25,25,30,60,80]
        busterSword.innerText = `BuserSword: 1`
    }
    else {
        alert('not enough money')
    }
})
// SHOP BACK BUTTON
const shopBackButton = document.querySelector('#shopBack')
shopBackButton.addEventListener('click', switchToMap)

const shopMoney = document.querySelector('.shopMoney')
const updateShopMoney = () => {
    shopMoney.innerText = `Gil: ${cloud.money}`
}


// MAP EVENT LISTENERS
// MOVING CHARACTER
const playerIconMap = document.querySelector('.player-icon-map')
let targetPosition = (e) => {
    let xPosition = e.clientX - mapScreen.getBoundingClientRect().left
    let yPosition = e.clientY - mapScreen.getBoundingClientRect().top
    let value = "translate3d(" + xPosition + "px, " + yPosition + "px, 0)";
    playerIconMap.style.transform = value
}
mapScreen.addEventListener('click',targetPosition, false)




// MONSTERS ON MAP 
const sixHeadDragonMapIcon = document.querySelector('#sixHeadedDragon')
const snakeBladesMapIcon = document.querySelector('#snakeBlades')
const skullsMapIcon = document.querySelector('#skulls')
const hornDemonIcon = document.querySelector('#hornDemon')
const cactuarIcon = document.querySelector('#cactuar')
// Trigger Battle with monsters event listeners
sixHeadDragonMapIcon.addEventListener('click', () => {
    setTimeout(function() {
        let battleAsk = confirm('Would You like to fight the Six Headed Dragon?' )
        if(battleAsk) {
            switchToBattle()
            fight(sixHeadDragon)
        }
        return
    },1000)
})
snakeBladesMapIcon.addEventListener('click', () => {
    setTimeout(function() {
        if(sixHeadDragon.hasWon) {
            let battleAsk = confirm('Would You like to fight SnakeBlades?' )
            if(battleAsk) {
                switchToBattle()
                fight(snakeBlades)
            }
        }
        else {
            alert('You have not yet earned the right to fight Cactuar')
        }
        return
    },1000)
})
skullsMapIcon.addEventListener('click', () => {
    setTimeout(function() {
        if(snakeBlades.hasWon) {
            let battleAsk = confirm('Would You like to fight Skulls?' )
            if(battleAsk) {
                switchToBattle()
                fight(skulls)
            }
        }
        else {
            alert('You have not yet earned the right to fight Cactuar')
        }
        return
    },1000)
})
hornDemonIcon.addEventListener('click', () => {
    mapScreen.addEventListener('click',targetPosition)
    setTimeout(function() {
        if(skulls.hasWon) {
            let battleAsk = confirm('Would You like to fight the Horn Demon?' )
            if(battleAsk) {
                switchToBattle()
                fight(hornDemon)
            }
        }
        else {
            alert('You have not yet earned the right to fight Cactuar')
        }
        return
    },1000)
})
cactuarIcon.addEventListener('click', () => {
    setTimeout(function() {
        if(hornDemon.hasWon) {
            let battleAsk = confirm('Are you sure you want to fight Cactuar the final Boss???' )
            if(battleAsk) {
            switchToBattle()
            fight(cactuar)
            }
        }
        else {
            alert('You have not yet earned the right to fight Cactuar')
        }
        return
    },1000)
})

// SHOP ON MAP
const shop1 = document.querySelector('#shop1')
const shop2 = document.querySelector('#shop2')
shop1.addEventListener('click', () => {
    mapScreen.addEventListener('click',targetPosition)
    setTimeout(function() {
        let shopAsk = confirm('Would you like to enter the shop?' )
        if(shopAsk) {
            switchToShop()
        }
        return
    },1000)
})
shop2.addEventListener('click', () => {
    mapScreen.addEventListener('click',targetPosition)
    setTimeout(function() {
        let shopAsk = confirm('Would you like to enter the shop?' )
        if(shopAsk) {
            switchToShop()
        }
        return
    },1000)
})
// MAP HEALTH AND INVENTORY UPDATES 
let mapHealth = document.querySelector('#playerHealthMap')
mapHealth.innerText = `Health: ${cloud.health}`
// UPDATE MAP HEALTH 
const updateMapHealth = () => {
    mapHealth.innerText = `Health: ${cloud.health}`
}

let mapPotion = document.querySelector('.mapPotion')
let mapHiPotion = document.querySelector('.mapHiPotion')
let mapMegaPotion = document.querySelector('.mapMegaPotion')
// UPDATE POTIONS 
const updateMapInventory = () => {
    mapPotion.innerText = cloud.potion + ' ' + 'Potion'
    mapHiPotion.innerText = cloud.hiPotion + ' ' + 'Hi-Potion'
    mapMegaPotion.innerText = cloud.megaPotion + ' ' + 'MegaPotion'

    
}

// USING POTIONS IN MAP 
let potionHealFunc = () => {
    if(cloud.potion > 0) {
        console.log(cloud.health)
        healAnimation()
        cloud.health += potionHeals.potion
        actionsDialogue.innerText = `You Healed ${potionHeals.potion} HP!`   
        playerHealth.innerText = `Health: ${cloud.health}`    
        console.log(cloud.health) 
        cloud.potion--
        updateMapHealth()
        updateMapInventory()
        hideItems()
    }
    else {
        alert('You dont have Potions!')
    }
}
let hiPotionHealFunc = () => {
    if(cloud.hiPotion > 0) {
        console.log(cloud.health)
        healAnimation()
        cloud.health += potionHeals.hiPotion
        actionsDialogue.innerText = `You Healed ${potionHeals.hiPotion} HP!`
        playerHealth.innerText = `Health: ${cloud.health}`            
        cloud.hiPotion--
        updateMapHealth()
        console.log(cloud.health) 
        updateMapInventory()
        hideItems()
    }
    else {
        alert('You dont have Hi-Potions!')
    }
}
let megaPotionHealFunc = () => {
    if(cloud.megaPotion > 0) {
        console.log(cloud.health)
        healAnimation()
        cloud.health += potionHeals.megaPotion
        actionsDialogue.innerText = `You Healed ${potionHeals.megaPotion} HP!`
        playerHealth.innerText = `Health: ${cloud.health}`            
        cloud.megaPotion--
        updateMapHealth()
        console.log(cloud.health) 
        updateMapInventory()
        hideItems()
    }
    else {
        alert('You dont have Mega Potions!')
    }
}

mapPotion.addEventListener('click',potionHealFunc)
mapHiPotion.addEventListener('click',hiPotionHealFunc)
mapMegaPotion.addEventListener('click',megaPotionHealFunc)




// Battle SYSTEM + event listeners
// DIALOGUE BOXES
let enemyInfo = document.querySelector('#enemyInfo')
let actionsDialogue = document.querySelector('#dialogueActions')
let playerHealth = document.querySelector('.playerHealth')

// win condition
const winCondition = (enemy) => {
    if(enemy.health <= 0) {
        console.log('hi')
        actionsDialogue.innerText = `You defeated the ${enemy.name}! \n You earned ${enemy.bounty} Gil!`
        mapHealth.innerText = `Health: ${cloud.health}`
        cloud.money += enemy.bounty
        enemy.bounty = 0
        enemy.hasWon = true
        return true
    }
    else {
        return false
    }
}
// lost condition
const loseCondition = (player) => {
    if(player.health <= 0) {
        switchToMap()
        console.log(cloud.health)
        alert('You Died')
        cloud.health = 1
        return
    }
    return
}

// CHANGE PLAYER
let switchPlayer = (player) => {
    if(player === 'cloud') {
        currentPlayer = 'enemy'
    }
    else {
        currentPlayer ='cloud'
    }
    console.log(currentPlayer)
    return
}



// CLOUD ATTACK ANIMATION 
// SLASH ANIMATION
let cloudSlashAnimation = () => {
    
    setTimeout(function() {
        attackAnimation.classList.remove('attack-off')
        cloudAttackSound.play()
    }, 1000)
    setTimeout(function() {
        cloudAttackSound.play()
    },2000)
    setTimeout(function() {
        attackAnimation.classList.add('attack-off')
    }, 3000) 
}
// MOVE ATTACK ANIMATION
let cloudMoveAnimation = () => {
   
    let playerIcon = document.querySelector('.player-icon')
        setTimeout(function() {
            playerIcon.classList.add('attackMove')
        },300)
        setTimeout(function() {
            playerIcon.classList.remove('attackMove')
        },1300)
}
// CLOUD DAMAGE DEAL FUNC
// attack button
const attackButton = document.querySelector('#attack')
// attack animation class
const attackAnimation = document.querySelector('.attack-animation')
const attack = (enemy) => {
    attackButton.addEventListener('click', () => {
        cloudSlashAnimation() 
        cloudMoveAnimation()
        // ATTACK PART
        let damageDone = cloud.cloudAttack()
        actionsDialogue.innerText = `You dealt ${damageDone} damage!`
        // subtract from enemy hp
        enemy.health -= damageDone
        enemyInfo.innerText = `${enemy.name} \n Health: ${enemy.health}`
        // if the enemy isnt dead let them attack
        winCondition(enemy)
       if(enemy.health > 0) {
           enemyTurn(enemy)
       }
    })
    return
}



// item button
const itemOption = document.querySelector('#item')
let allOptions = document.querySelector('.player-options')
const showItems = () => {
    let inventory = document.querySelector('.inventory')
        allOptions.classList.add('off')
        inventory.classList.remove('off')
}
const hideItems = () => {
    let inventory = document.querySelector('.inventory')
        allOptions.classList.remove('off')
        inventory.classList.add('off')
        return
}
const items = () => {
    // open inventory after item button is clicked
    const backButton = document.querySelector('#backButton')
    backButton.addEventListener('click', hideItems)
    itemOption.addEventListener('click', showItems)
    return
}
//USING POTIONS
let healFunc = (potionHeals) => {
    if(cloud.potion > 0) {
        console.log(cloud)
        cloud.health += potionHeals.pot
        console.log(cloud)
    }
}

let battlePotion = document.querySelector('#battlePotion') 
let battleHiPotion = document.querySelector('#battleHiPotion')
let battleMegaPotion = document.querySelector('#battleMegaPotion')

battlePotion.addEventListener('click', () => {
    potionHealFunc()
}) 
battleHiPotion.addEventListener('click', hiPotionHealFunc)
battleMegaPotion.addEventListener('click',megaPotionHealFunc)



// HEAL ANIMATION
const healAnimation = () => {
    let healAnimation = document.querySelector('.heal-animation')
        healSound.play()
        setTimeout(function() {
            healAnimation.classList.remove('heal-off')
        }, 500)
        setTimeout(function() {
            healAnimation.classList.add('heal-off')
        }, 3500)
        return
}



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
        
        // ENEMY TURN
        enemyTurn(enemy)
        return
    })
    return
}


// run button
const runOption = document.querySelector('#run')
const run = (enemy) => {
    runOption.addEventListener('click', () => {
        let playerIcon = document.querySelector('.player-icon')
        setTimeout(function() {
            playerIcon.classList.add('run')
        },500)
        setTimeout(function() {
            playerIcon.classList.remove('run')
        },4000)
        setTimeout(switchToMap,3500)
        // ACTUAL enemy attack 
        setTimeout(enemyMoveAttackAnimation,1000)
        setTimeout(enemyAttackAnimation,1500)
        setTimeout(function() {
            let damageTaken = enemy.enemyAttack()
            actionsDialogue.innerText = `You took ${damageTaken} damage!`
            cloud.health -= damageTaken
            playerHealth.innerText = `Health: ${cloud.health}`
        },500)
        return 
    })
    return 
}


// fight sequence


const playerTurn = (enemy) => {
    // creates event listeners for battle options
    attack(enemy)
    items()
    steal(enemy)
    run(enemy)
    return
}

// ENEMY ATTACK ANIMATION
let enemyAttack = document.querySelector('.enemy-animation')
// SLASH
let enemyAttackAnimation = () => {
    enemyAttack.classList.remove('attack-off')
    setTimeout(function() {
        enemyAttack.classList.add('attack-off')
    }, 2000) 
}
let enemyMoveAttackAnimation = () => {
    enemyIcon.classList.add('enemyAttack')
    
    setTimeout(function() {
        enemyIcon.classList.remove('enemyAttack')
    },2000)
}
// enemy attack Function
const enemyTurn = (enemy) => {
        // ENEMY TURN
        //enemy move animation
        let enemyIcon = document.querySelector('.enemy-icon')
        // ENEMY ATTACK ANIMATION
        setTimeout(enemyMoveAttackAnimation,4000)
        setTimeout(function() {
            enemyDamageSound.play()
        },5000)
        setTimeout(enemyAttackAnimation,5000)
        // ACTUAL enemy attack 
        setTimeout(function() {
            let damageTaken = enemy.enemyAttack()
            actionsDialogue.innerText = `You took ${damageTaken} damage!`
            cloud.health -= damageTaken
            playerHealth.innerText = `Health: ${cloud.health}`
        },5500)
        loseCondition(cloud)
    return 
}

let enemyIcon = document.querySelector('.enemy-icon')



let currentPlayer = 'cloud'


//FIGHT FUNCTION
const fight = (enemy) => {
    // reset enemy health everytime new fight is initiated 
    actionsDialogue.innerText = ''
     // change the Enemy Icon based on Monster
    enemyIcon.style.backgroundImage = `url('${enemy.url}')`
    enemyInfo.innerText = `${enemy.name} \n Health: ${enemy.health}`
    // Clouds current health
    playerHealth.innerText = `Health: ${cloud.health}`
    //activate Event Listeners
   playerTurn(enemy)
   
}

let testDelete = () => {
    if(sixHeadDragon.hasWon) {
        sixHeadDragonMapIcon.remove()
    }
    if(snakeBlades.hasWon) {
        snakeBladesMapIcon.remove()
    }
    if(hornDemon.hasWon) {
        hornDemonIcon.remove()
    }
    if(skulls.hasWon) {
        skullsMapIcon.remove()
    }
    if(cactuar.hasWon) {
        cactuarIcon.remove()
    }
    return
}

