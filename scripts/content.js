/*
*
* This script handles injecting code into the site
*
*/

var s = document.createElement('script');
s.src = chrome.runtime.getURL('lib/xlsx.full.min.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);

var s = document.createElement('script');
s.src = chrome.runtime.getURL('scripts/ns_modern_excel.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);

const img = document.createElement('img');
img.src = chrome.runtime.getURL('data-export-icon-0.png');
img.id = "me-icon";
img.setAttribute('hidden','');
document.body.append(img);

const imgLoading = document.createElement('img');
imgLoading.src = chrome.runtime.getURL('Loading_icon.gif');
imgLoading.id = "me-loading-icon";
imgLoading.setAttribute('hidden','');
document.body.append(imgLoading);
