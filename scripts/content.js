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
s.src = chrome.runtime.getURL('scripts/ns_better_export.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);

const img = document.createElement('img');
img.src = chrome.runtime.getURL('images/data-export-icon-0.png');
img.id = "me-icon";
img.setAttribute('hidden','');
document.body.append(img);

const imgLoading = document.createElement('img');
imgLoading.src = chrome.runtime.getURL('images/Loading_icon.gif');
imgLoading.id = "me-loading-icon";
imgLoading.setAttribute('hidden','');
document.body.append(imgLoading);
