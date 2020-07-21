
// Screen divs 
const mapScreen = document.querySelector(".map")
const battleScreen = document.querySelector(".battle-screen")
const shopScreen = document.querySelector(".shop")


// MAP TOGGLES 
const mapToggle = document.querySelector("#map-toggle")
const battleToggle = document.querySelector('#battle-toggle')
const shopToggle = document.querySelector('#shop-toggle')

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

// Battle Options Event Listeners
// have to move these inside a function when its the players turn 
// attack button
const attackOption = document.querySelector('#attack')
// attack animation class
const attackAnimation = document.querySelector('.attack-animation')

attackOption.addEventListener('click', () => {
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
    
})

// item button
const itemOption = document.querySelector('#item')
let allOptions = document.querySelector('.player-options')
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
stealOption.addEventListener('click', () => {
    let playerIcon = document.querySelector('.player-icon')
    setTimeout(function() {
        playerIcon.classList.add('steal')
    }, 1000)
    setTimeout(function() {
        playerIcon.classList.remove('steal')
    }, 4000)
    
})

// run button
const runOption = document.querySelector('#run')
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


// SHOP EVENT LISTENERS 

// BACK BUTTON
const shopBackButton = document.querySelector('#shopBack')
shopBackButton.addEventListener('click', () => {
    mapScreen.classList.remove('inactive')
    battleScreen.classList.add('inactive')
    shopScreen.classList.add('inactive')
})