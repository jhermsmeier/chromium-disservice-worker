var CODE = `
!(function() {

  function removeServiceWorkerRegistrations() {
    if( 'serviceWorker' in navigator ) {
      navigator.serviceWorker.getRegistrations().then( function( registrations ) {
        Promise.all( registrations.map(( worker ) => worker.unregister()) )
          .catch( function( error ) {})
      }).catch( function( error ) {})
    }
  }

  function removeCaches() {
    if( 'caches' in window ) {
      window.caches.keys().then( function( keys ) {
        Promise.all( keys.map(( key ) => window.caches.delete( key )) )
          .catch(( error ) => {})
      }).catch(( error ) => {})
    }
  }

  window.addEventListener( 'load', function() {
    // Give the serviceWorker a little time to register
    setTimeout( () => {
      removeServiceWorkerRegistrations()
      removeCaches()
    }, 1000 )
  })

})()
`

function disserviceTab( tab, callback ) {
  callback = callback || function() {}
  // console.log( 'Removing serviceWorker registrations for', tab )
  chrome.tabs.executeScript( tab.id, {
    allFrames: true,
    runAt: 'document_idle',
    code: CODE,
  }, ( ...results ) => {
    var error = chrome.runtime.lastError
    if( error ) console.log( tab.id, tab.url, error.message )
    callback( error, ...results )
  })
}

function disserviceStorage( callback ) {
  callback = callback || function() {}
  // console.log( 'Removing serviceWorker from browsing data storage...' )
  chrome.browsingData.removeServiceWorkers({
    since: 0,
    originTypes: {
      // Normal websites
      unprotectedWeb: true,
      // Websites that have been installed as hosted applications
      protectedWeb: false,
      // Extensions and packaged applications a user has installed
      extension: false,
    }
  }, () => {
    var error = chrome.runtime.lastError
    if( error ) console.log( tab.id, tab.url, error.message )
    callback( error )
  })
}

chrome.tabs.onCreated.addListener(( tab ) => {
  disserviceTab( tab, () => { disserviceStorage() })
})

chrome.tabs.onUpdated.addListener(( tabId, changeInfo, tab ) => {
  disserviceTab( tab, () => { disserviceStorage() })
})

chrome.tabs.onActiveChanged.addListener(( tabId ) => {
  disserviceStorage()
})
