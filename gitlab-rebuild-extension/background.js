// TODO customize these fields
var rebuildAlarmStartTime = 'May 26, 2016 07:00:00';
var userId = "671";

// constants, do not change
var BASE_URL = 'https://scm.hue.workslan';
var openMrUrl = BASE_URL + '/dashboard/merge_requests?scope=all&state=opened&utf8=%E2%9C%93&assignee_id=&author_id='
    + userId;
var alarmName = 'ci-rebuild-alarm';

// on alarm
chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === alarmName) {
        console.log('Received rebuild alarm! Opening MR page: ' + openMrUrl);
        openMrPage();
    }
});

// create rebuild alarms periodically
chrome.alarms.create(alarmName, {
    when: new Date(rebuildAlarmStartTime).getTime(),
    periodInMinutes: 24 * 60
});

// on click
chrome.browserAction.onClicked.addListener(function () {
    openMrPage();
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('Received url: ' + request.mrUrl);
    chrome.tabs.create({url: request.mrUrl}, function (tab) {
        checkBuildResultsAndRebuild(tab);
    });
});

function openMrPage() {
    chrome.tabs.create({url: openMrUrl}, analyseFirstPage);
}

function analyseFirstPage(tab) {
    chrome.extension.onRequest.addListener(function (json, port, reply) {
        if (json.message === "CLOSE") {
            chrome.tabs.remove(tab.id);
        }
    });

    chrome.tabs.onUpdated.addListener(function (tabId, info) {
        if (tabId === tab.id && info.status == "complete") {
            chrome.tabs.executeScript(tabId, {file: "jquery.js"}, function () {
                chrome.tabs.executeScript(tabId, {file: "open-mr.js"});
            });
        }
    });
}

function checkBuildResultsAndRebuild(tab) {
    chrome.tabs.onUpdated.addListener(function (tabId, info) {
        if (tabId === tab.id && info.status == "complete") {
            chrome.tabs.executeScript(tab.id, {file: "jquery.js"}, function () {
                chrome.tabs.executeScript(tab.id, {file: "rebuild.js"});
            });
        }
    });
}