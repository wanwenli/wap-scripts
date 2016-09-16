$(function () {
    var BASE_URL = 'https://scm.hue.workslan';
    
    var mrLinkSelector = 'span.merge-request-title-text > a.row_title';
    
    $(mrLinkSelector).ready(function () {
        console.log('Page opened. Analyzing...');
        $(mrLinkSelector).each(function(key, val) {
            console.log('Detected MR link: ' + BASE_URL + val.href);
            chrome.runtime.sendMessage({mrUrl: val.href});
        });
    });
});
