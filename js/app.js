if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((res) => {
            console.log("Service Worker registered.", res)
        })
        .catch((err) => {
            console.log("Service Worker not registered.", err)
        })
}