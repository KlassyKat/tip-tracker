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
let lastSession = Object.keys(storage)[0];
let activeSession = lastSession;


//UI Stuff
let newOrder = document.getElementById('new-order');
let hamburgerMenu = document.getElementById('hamburger-menu-container');
let hamburgerMenuSideBar = document.getElementById('hamburger-menu');

function showNewOrder() {
    newOrder.style.display = 'flex';
}

function hideNewOrder() {
    newOrder.style.display = 'none';
    nameInput.value = null;
    orderInput.value = null;
    recievedInput.value = null;
}

function showHamburgerMenu() {
    hamburgerMenu.style.display = 'flex';
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


// New Sessions
function addNewSession() {
    storage = JSON.parse(localStorage.getItem('storage'));
    let sessionKey = 'session' + (Object.keys(storage).length + 1);
    storage[sessionKey] = {
        totalTips: 0.00,
        totalOrders: 0.00,
        totalRecieved: 0.00,
        orders: {}
    };
    localStorage.setItem('storage', JSON.stringify(storage));
    createSessionTile(sessionKey);
}

let sessionTile = document.getElementById("session-placeholder");
function createSessionTile(id) {
    let newSession = sessionTile.cloneNode(true);
    newSession.id = id;
    let d = new Date();
    let hours = d.getHours() <= 12 ? d.getHours() : d.getHours() - 12;
    let minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    newSession.children[0].innerHTML = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear() + ' ' + hours + ':' + minutes;
    sessionTile.parentElement.children[0].after(newSession);
}


// New Orders
let orderTile = document.getElementById('placeholder');
let nameInput = document.getElementById('name-input');
let orderInput = document.getElementById('order-input');
let recievedInput = document.getElementById('recieved-input');
function addNewOrder() {
    storage = JSON.parse(localStorage.getItem('storage'));
    let orderName = nameInput.value;
    let orderPrice = orderInput.value;
    let orderRecieved = recievedInput.value;
    let orders = storage[activeSession].orders
    let orderKey = 'order' + (Object.keys(orders).length + 1);
    let tip = orderRecieved - orderPrice;
    orders[orderKey] = {
        "orderName": orderName,
        "orderPrice": orderPrice,
        "orderRecieved": orderRecieved,
        "tip": tip
    }
    localStorage.setItem('storage', JSON.stringify(storage));
    hideNewOrder();
    nameInput.value = null;
    orderInput.value = null;
    recievedInput.value = null;
}