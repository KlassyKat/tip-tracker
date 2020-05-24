if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((res) => {
            console.log("Service Worker registered.", res)
        })
        .catch((err) => {
            console.log("Service Worker not registered.", err)
        })
}

let newOrder = document.getElementById('new-order');
let hamburgerMenu = document.getElementById('hamburger-menu-container');

function showNewOrder() {
    newOrder.style.display = 'flex'
}

function hideNewOrder() {
    newOrder.style.display = 'none'
}

function showHamburgerMenu() {
    hamburgerMenu.style.display = 'flex'
}

function hideHamburgerMenu() {
    hamburgerMenu.style.display = 'none'
}