# DisserviceWorker

A Chrome extension that unregisters ServiceWorkers and deletes their caches.

## About

I've finally had it with [ServiceWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) – I don't like the lack of control over them, so they have to go.
Unfortunately Chromium / Chrome only allows you to disable them by disabling website storage (cookies, localStorage, etc.) completely, which doesn't work for me. Neither does manually combing through them to delete them every once in a while.

So here we are, experimenting with the riddance of ServiceWorkers by extension.

## Caveats

### They don't stop running

Since there's no (public) API to stop service workers once they've been registered and have started running,
currently a lot of them survive being unregistered until the tabs using them are closed.

One potential remedy to this could be to track the service worker source URLs as they're being registered,
and then subsequently block requests to those URLs via the [webRequest API](https://developer.chrome.com/extensions/webRequest).
