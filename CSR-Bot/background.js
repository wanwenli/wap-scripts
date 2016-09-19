chrome.browserAction.onClicked.addListener(function () {
  var csrUrl = "http://192.168.187.207/cws/shuro/main";
  chrome.tabs.create({ url: csrUrl }, function(tab) {
    chrome.tabs.executeScript(tab.id, {file: "jquery.js"}, function () {
      chrome.tabs.executeScript(tab.id, {file: "jquery.waituntilexists.js"}, function () {
        chrome.tabs.executeScript(tab.id, {file: "fillin.js"});
        chrome.tabs.onUpdated.addListener(function(tabId , info) {
          if (tabId === tab.id) {
            if (info.status === 'complete') {
              chrome.tabs.executeScript(tab.id, {file: "jquery.js"});
              chrome.tabs.executeScript(tab.id, {file: "jquery.waituntilexists.js"});
              chrome.tabs.executeScript(tab.id, {file: "fillin.js"});
            }
          }
        });
      });
    });
  });
});
