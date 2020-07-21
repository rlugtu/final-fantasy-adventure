
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



// Battle Options Event Listeners
// have to move these inside a function when its the players turn 
// attack button
const attackButton = document.querySelector('#attack')
// attack animation class
const attackAnimation = document.querySelector('.attack-animation')
const attack = (enemy) => {
    const isDead = (enemy) => {
        if(enemy.health < 0) {
            console.log('You won!')
            setTimeout(function() {
               switchToMap() 
            }, 5000)
        }
    }
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

        enemy.health -= cloud.cloudAttack()
        console.log('enemy health: ' + enemy.health)
        isDead(enemy)
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
const stealOption = document.querySelector('#steal')
const steal = () => {
    stealOption.addEventListener('click', () => {
        let playerIcon = document.querySelector('.player-icon')
        setTimeout(function() {
            playerIcon.classList.add('steal')
        }, 1000)
        setTimeout(function() {
            playerIcon.classList.remove('steal')
        }, 4000)
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




// ENEMY STATS

class Enemy {
    constructor(name, health, attack) {
        this.name = name;
        this.health = health;
        this.attack = attack;
    }
    enemyAttack() {
        // return a random number from the range of damages the monster can make
        return this.attack[Math.floor(Math.random()*this.attack.length)]
    }
} 

const monster1 = new Enemy('test', 10, [1,2,3,4,5]) 

const cloud = {
    name: 'Cloud',
    attack: [1,2,3,4,5],
    health: 100,

    cloudAttack() {
        return(this.attack[Math.floor(Math.random()*this.attack.length)])
    }
}

// fight sequence
const playerOptions = (enemy) => {
    attack(enemy)
    items()
    steal()
    run()
}

const fight = (enemy) => {
    if(enemy.health > 0) {
        playerOptions(enemy)
    }
}

fight(monster1)