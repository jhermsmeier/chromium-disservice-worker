# DisserviceWorker

A Chrome extension that unregisters ServiceWorkers and deletes their caches.

## About

I've finally had it with [ServiceWorkers] – I don't like the lack of control over them, so they have to go.
Unfortunately Chromium / Chrome only allows you to disable them by disabling website storage (cookies, localStorage, etc.) completely, which doesn't work for me. Neither does manually combing through them to delete them every once in a while.

So here we are, experimenting with the riddance of ServiceWorkers by extension.
