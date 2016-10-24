(function($) {
  var employementId = 'S086';
  $('#datainput tr td input').waitUntilExists(function() {
    $('#datainput tr td input:eq(0)').val(employementId);
    $('#datainput tr td p input:eq(0)').click();
  }, true);

  $('.mainmenuleft .menulist .menu a').waitUntilExists(function() {
    $('.mainmenuleft .menulist .menu a').get(0).click();
  }, true);

  $('.lg-body tbody tr td a').waitUntilExists(function() {
    $('.lg-body tbody tr td a').get(0).click();
  }, true);

  var dateObj = new Date();
  var year = dateObj.getFullYear(),
      month = dateObj.getMonth() + 1,
      day = dateObj.getDate(),
      hour = dateObj.getHours(),
      minute = dateObj.getMinutes() + Math.round(Math.random() * 15) + 1;

  // fault tolerance when timeout
  $('h1').waitUntilExists(function(){
    if($('h1').text() === "TimeOut"){
      window.location.href = 'main';
    }
  },true);

  // choose the date that has no record
  $('#APPROVALGRD').waitUntilExists(function(){
    $('#APPROVALGRD').each(function(index, tr) {
      var lines = $('td', tr).map(function(index, td) {
          return $(td);
      });
      // TODO refactor
      var found = false;
      for (i = 0; i + 5 < lines.length;i++) {
          if(lines[i+2].text() === "workvacation"&&
            lines[i+5].text() === "-"){
            lines[i+4].children()[0].click();
            found = true;
            break;
          }
      }
      // fill previous month
      if(!found){
        var href = $('#TOPRVTM').attr('href');
        window.location.href = href;
      }
  });
  }, true);

  // choose the last entered code
  $('.PmPanelEntryTimeWidgetAreaStyle .PmEventSpan:eq(0)').waitUntilExists(function() {
    setTimeout(function(){
      $('.PmPanelEntryTimeWidgetAreaStyle .PmEventSpan:eq(0)').click();
      // this stupid `PmPanelEntry` is not initialized. so have to wait
    }, 15000);
  }, true);

  $('#PmDdEntryTimeInputWidget_0H').waitUntilExists(function() {
    var workingHour = hour - 19 + 8;
    // make sure at least 8 hours of working
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
})(jQuery);
