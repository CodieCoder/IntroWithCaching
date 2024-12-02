//Make sure sw are supported
if ('serviceWorker' in navigator) {
  console.log('Service Worker Supported');
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw_cached_site.js')
      .then((register) => console.log('Service Worker : Registered'))
      .catch((error) => console.error(`Service Worker Error: ${error}`));
  });
} else {
  console.log('Service Worker NOT Supported');
}
