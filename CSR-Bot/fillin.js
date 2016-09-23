$(function() {
  $('#datainput tr td input').waitUntilExists(function() {
    $('#datainput tr td input:eq(0)').val('your id');
    $('#datainput tr td p input:eq(0)').click();
  }, true);

  $('.mainmenuleft .menulist .menu a').waitUntilExists(function() {
    $('.mainmenuleft .menulist .menu a').get(0).click();
  }, true);

  $('.lg-body tbody tr td a').waitUntilExists(function() {
    $('.lg-body tbody tr td a').get(0).click();
  }, true);

  var dateObj = new Date();
  var year = dateObj.getFullYear();
  var month = dateObj.getMonth() + 1;
  var day = dateObj.getDate();

  var hour = dateObj.getHours();
  var minute = dateObj.getMinutes();

  $('.PmPanelEntryTimeWidgetAreaStyle .PmEventSpan:eq(1)').waitUntilExists(function() {
    $('.PmPanelEntryTimeWidgetAreaStyle .PmEventSpan').get(1).click();
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
