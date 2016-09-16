$(function () {
    $('div.mr-widget-heading').ready(function () {
        if (isDisplayed('div.ci-not_found')) {
            return console.log('CI status cannot be found. Skipped.');
        }

        if (isDisplayed('div.ci-pending')) {
            return console.log('CI build pending. Skipped.');
        }

        if (isDisplayed('div.ci-success')) {
            return console.log('Congrats! CI build passed and skipped.');
        }

        var rebuildBtnSelector = 'a.ci-rebuild';

        if (!isDisplayed(rebuildBtnSelector)) {
            return console.log('Rebuild button cannot be found. Skipped.');
        }

        if (isDisplayed('div.ci-failed') || isDisplayed('div.ci-canceled')) {
            console.log('CI build failed. Attempting to rebuild soon.');

            // wait 30 sec for event binding to complete
            setTimeout(function () {
                document.getElementsByClassName('ci-rebuild')[0].click();
                console.log('Rebuild button clicked.');
            }, 30 * 1000);
        }
    });

    function isDisplayed(selector) {
        var $elt = $(selector);
        if ($elt.size() > 0 && $elt.css('display') !== 'none') {
            return true;
        } else {
            return false;
        }
    }
});
