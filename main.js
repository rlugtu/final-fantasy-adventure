
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

// attack button
const attackOption = document.querySelector('#attack')
// attack animation class
const attackAnimation = document.querySelector('.attack-animation')

attackOption.addEventListener('click', () => {
    setTimeout(function() {
        attackAnimation.classList.remove('attack-off')
    }, 1000)
    
    setTimeout(function(){
        attackAnimation.classList.add('attack-off')
    }, 3000) 
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
