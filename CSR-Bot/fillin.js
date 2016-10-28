$(function() {
  $('#datainput tr td input').waitUntilExists(function() {
    $('#datainput tr td input:eq(0)').val('S086');
    $('#datainput tr td p input:eq(0)').click();
  }, true);

  $('select#langmode').waitUntilExists(function() {
    var $englishOpt = $('select#langmode').children().get(1);
    if (!$englishOpt.selected) {
      window.open($englishOpt.value, '_self');
    }
  }, true);

  $('.mainmenuleft .menulist .menu a').waitUntilExists(function() {
    setTimeout(function() {
      $('.mainmenuleft .menulist .menu a').get(0).click();
    }, 5000);
  }, true);

  $('.lg-body tbody tr td a').waitUntilExists(function() {
    $('.lg-body tbody tr td a').get(0).click();
  }, true);

  var today = new Date();
  var year = today.getFullYear(),
    month = today.getMonth() + 1,
    day = today.getDate(),
    hour = today.getHours(),
    minute = today.getMinutes() + Math.round(Math.random() * 15) + 1;

  // fault tolerance when timeout
  $('h1').waitUntilExists(function() {
    if ($('h1').text() === "TimeOut") {
      window.location.href = 'main';
    }
  }, true);

  // choose the date that has no record
  $('#APPROVALGRD').waitUntilExists(function() {
    $('#APPROVALGRD').each(function(index, tr) {
      // aggregate td elements, because each tr has different number of td
      var lines = $('td', tr).map(function(index, td) {
        return $(td);
      });
      var found = false;
      for (var i = 0; i + 5 < lines.length; i++) {
        // start a row
        if (lines[i + 2].text() === "workvacation") {
          // retrieve date for entry
          var tokens = lines[i].text().split('/');
          var month = tokens[0],
            day = tokens[1];
          var date = new Date(year, month - 1, day);
          if (lines[i + 5].text() === "-") {
            if (date <= today) {
              // entries up to today are all complete
              lines[i + 4].children()[0].click();
              found = true;
            } else {
              // entries for the entire month is complete
              found = false;
            }
            break;
          }
        }
      }
      // fill previous month
      if (!found) {
        var href = $('#TOPRVTM').attr('href');
        window.location.href = href;
      }
    });
  }, true);

  // choose the last entered code
  $('.PmPanelEntryTimeWidgetAreaStyle .PmEventSpan:eq(0)').waitUntilExists(function() {
    setTimeout(function() {
      // this stupid `PmPanelEntry` is not initialized. so have to wait
      // want-cry-no-tears.jpg
      $('.PmPanelEntryTimeWidgetAreaStyle .PmEventSpan:eq(0)').click();
    }, 15000);
  }, true);

  $('#PmDdEntryTimeInputWidget_0H').waitUntilExists(function() {
    var workingHour = hour - 19 + 8;
    workingHour = workingHour > 8 ? workingHour : 8;
    $('#PmDdEntryTimeInputWidget_0H').val(workingHour);
    $('#PmDdEntryTimeInputWidget_0M').val(minute);

    $('#btnNext1').waitUntilExists(function() {
      $(this).click();
    }, true);
  }, true);

  $('#dSave1').waitUntilExists(function() {
    $(this).click();
  }, true);
});
