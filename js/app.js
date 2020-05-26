if ('serviceWorker' in navigator) {
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
let lastSession = Object.keys(storage).slice(-1);
let activeSession = lastSession;

let sessionList = document.getElementById('sessions-list');
let sessionTile = document.getElementById("session-placeholder");
let orderList = document.getElementById("order-list");
let orderTile = document.getElementById('placeholder');


//Load Data
for (session in storage) {
    // session = storage[session];
    createSessionTile(session);
}

setActiveTile();


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
    let timestampVal = makeTimestamp();
    storage[sessionKey] = {
        timestamp: timestampVal,
        orders: {}
    };
    localStorage.setItem('storage', JSON.stringify(storage));
    createSessionTile(sessionKey);
    activeSession = Object.keys(storage).slice(-1);
    setActiveTile();
}

function createSessionTile(id) {
    let newSession = sessionTile.cloneNode(true);
    newSession.id = id;
    newSession.children[0].innerHTML = storage[id].timestamp;
    sessionTile.parentElement.children[0].after(newSession);
    selectActiveSession();
}

function setActiveTile() {
    for (child of sessionList.children) {
        if (child.id == activeSession) {
            child.style.backgroundColor = '#009e91';
        } else {
            child.style.backgroundColor = "#1E52B4"
        }
        clearOrders();
    }
}

selectActiveSession();

function selectActiveSession() {
    let sessions = document.querySelectorAll('.session');
    for (session of sessions) {
        if (session.id != 'add-new-session') {
            session.addEventListener('click', e => {
                activeSession = e.currentTarget.id;
                setActiveTile();
                loadOrders();
                updateTrackingPannel();
            })
        }
    }
    updateTrackingPannel();
}


// New Orders
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
        "orderPrice": Number.parseFloat(orderPrice),
        "orderRecieved": Number.parseFloat(orderRecieved),
        "tip": tip
    }
    localStorage.setItem('storage', JSON.stringify(storage));
    hideNewOrder();
    nameInput.value = null;
    orderInput.value = null;
    recievedInput.value = null;
    createOrderTile(orderKey);
    updateTrackingPannel();
}

function createOrderTile(id) {
    let newTile = orderTile.cloneNode(true);
    newTile.id = id;
    newTile.children[0].innerHTML = id.substring(5);
    newTile.children[1].innerHTML = storage[activeSession].orders[id].orderName;
    newTile.children[2].children[0].children[0].innerHTML = makeMoney(storage[activeSession].orders[id].orderPrice);
    newTile.children[2].children[1].children[0].innerHTML = makeMoney(storage[activeSession].orders[id].orderRecieved);
    newTile.children[2].children[2].children[0].innerHTML = makeMoney(storage[activeSession].orders[id].tip);
    orderList.lastChild.after(newTile);
}

function loadOrders() {
    clearOrders();
    if (activeSession.length > 0) {
        for (order in storage[activeSession].orders) {
            createOrderTile(order);
        }
    }
}

function clearOrders() {
    for (child of orderList.children) {
        if (child.id != 'placeholder') {
            orderList.removeChild(child);
        }
    }
}

//Update totals
function updateTrackingPannel() {
    let activeOrders = storage[activeSession].orders
    let tipTracker = document.getElementById('tip-tracker');
    let totalTracker = document.getElementById('total-tracker');
    let recievedTracker = document.getElementById('recieved-tracker');
    let sessionInfoTile = document.getElementById(activeSession);
    let totalTips = 0;
    let totalOrders = 0;
    let totalRecieved = 0;
    for (order in activeOrders) {
        order = activeOrders[order];
        totalTips += order.tip;
        totalOrders += order.orderPrice;
        totalRecieved += order.orderRecieved;
    }
    if (sessionInfoTile) {
        sessionInfoTile.children[1].children[1].innerHTML = makeMoney(totalOrders);
        sessionInfoTile.children[1].children[3].innerHTML = makeMoney(totalRecieved);
        sessionInfoTile.children[1].children[5].innerHTML = makeMoney(totalTips);
    }
    tipTracker.innerHTML = makeMoney(totalTips);
    totalTracker.innerHTML = makeMoney(totalOrders);
    recievedTracker.innerHTML = makeMoney(totalRecieved);
}

// Formatting
function makeTimestamp() {
    let d = new Date();
    let month = d.getMonth() + 1;
    let date = d.getDate();
    let year = d.getFullYear();
    let hours = d.getHours() == 0 ? 12 : d.getHours() < 12 ? d.getHours() : d.getHours() - 12;
    let minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    let timestamp = month + '/' + date + '/' + year + ' ' + hours + ':' + minutes;
    return timestamp;
}


function makeMoney(val) {
    val = Number.parseFloat(val).toFixed(2);
    val = "$" + val;
    return val
}