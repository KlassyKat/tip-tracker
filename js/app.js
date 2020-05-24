if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((res) => {
            console.log("Service Worker registered.", res)
        })
        .catch((err) => {
            console.log("Service Worker not registered.", err)
        })
}

// Storage
let storage = JSON.parse(localStorage.getItem('storage')) || {};
localStorage.setItem('storage', JSON.stringify(storage));

//UI Stuff
let newOrder = document.getElementById('new-order');
let hamburgerMenu = document.getElementById('hamburger-menu-container');
let hamburgerMenuSideBar = document.getElementById('hamburger-menu');

function showNewOrder() {
    newOrder.style.display = 'flex'
}

function hideNewOrder() {
    newOrder.style.display = 'none'
}

function showHamburgerMenu() {
    hamburgerMenu.style.display = 'flex'
}

hamburgerMenu.addEventListener("click", e => {
    hideHamburgerMenu();
})

hamburgerMenuSideBar.addEventListener("click", e => {
    e.stopPropagation();
})

function hideHamburgerMenu() {
    hamburgerMenu.style.display = 'none'
}

// Element Handelers
const order = document.getElementById('placeholder');
function createOrder() {
    let newOrder = order.cloneNode(true);
}

// New Orders
