// Check if sw (Service Workers) are supported
if('serviceWorker' in navigator) {
    console.log("Service Workers supported")
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("../sw_cached_pages.js")
            .then( reg => console.log("Registration Obj: ", reg))
            .catch( err => console.log("Error occured: ", err))
    } )
}