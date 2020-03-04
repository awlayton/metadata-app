/*
 * Code to append to service worker made by CRA
 */

/*global workbox */

// Cache Google API stuff?
workbox.routing.registerRoute(
    //'https://apis.google.com/js/platform.js',
    /https:\/\/apis\.google\.com\/.*/,
    new workbox.strategies.NetworkFirst()
)
workbox.routing.registerRoute(
    /https:\/\/[^.]*\.googleapis\.com\/.*/,
    new workbox.strategies.NetworkFirst()
)
