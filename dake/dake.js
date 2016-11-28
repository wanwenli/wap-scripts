var path = require('path');
var querystring = require('querystring');
var request = require('requestretry');
var schedule = require('node-schedule');
var moment = require('moment');
var getopt = require('node-getopt');
var ical = require('ical');
var holidays = {};

var parameters = getopt.create([
  ['u', 'username=[ARG]', 'username, required argument'],
  ['p', 'password=[ARG]', 'password, required argument'],
  ['i', 'immediate', 'immediately sign in after launching'],
  ['o', 'once', 'sign in once only upon launching and exits'],
  ['t', 'testing', 'testing mode, no actual request is sent'],
  ['h', 'help', 'show help message']
]).bindHelp();

// modify the parameters to customize the time to sign in or sign out
var timeOptions = {
  SIGN_IN_TIME: '0 15 10 * * 1-5',
  SIGN_OUT_TIME: '0 30 19 * * 1-5',
  WAIT_RANGE: 15 * 60 * 1000, // 15 minutes
  RETRY_DELAY: 3 * 60 * 1000 // 3 minutes
};

var operations = {
  SIGN_IN: 'syussya',
  SIGN_OUT: 'taisya'
};

var HOLIDAY_DIR = path.resolve(__dirname, 'holidays');
var HOLIDAY_DOWNLOAD_BASE_URL = 'http://www.mom.gov.sg/employment-practices/public-holidays/';

function isTestingMode() {
  if (args === undefined) {
    return false;
  } else if (args['testing']) {
    return true;
  } else {
    return false;
  }
}

// core method, send a https request to check-in.

function sendRequest(operation, callback) {
  var body = querystring.stringify({
    dakoku: operation,
    timezone: 480,
    user_id: args['username'],
    password: args['password']
  });

  if (isTestingMode()) {
    console.info('Testing mode: print out http request instead of sending.');
    console.info('Operation: ' + operation);
    console.info('Request body:\n' + body);
  } else {
    request.post({
      url: 'https://ckip.worksap.co.jp/cws/cws/srwtimerec',
      port: 443,
      form: body,
      maxAttempts: 3,
      retryDelay: timeOptions.RETRY_DELAY
    }, callback);
  }
}

// print out some logs according to the http response.
function responseCallback(message) {
  return function(err, res, body) {
    var dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    if (res === undefined) {
      console.log(dateTime + ' | Response undefined.');
    } else if (res.statusCode == 200) {
      console.log(dateTime + ' | Response Code 200: ' + message);
      console.log(dateTime + " | You're again protected by Dake.js today.");
    } else {
      console.log(dateTime + ' | Response Code ' + res.statusCode + ': ' + res.statusMessage);
      console.log('Number of request attempts: ' + res.attempts);
    }
  };
}


function loadPublicHoliday(filePath) {
  var holidayIcs = {};
  try {
    console.log('Loading holiday file: ' + filePath);
    holidayIcs = ical.parseFile(filePath);
  } catch (err) {
    console.error('Event file for public holidays in the year of ' + currentYear + ' cannot be found.');
    console.error('Please download it from ' + HOLIDAY_DOWNLOAD_BASE_URL);
    process.exit(0);
  }

  if (isTestingMode()) {
    console.log(holidayIcs);
  }

  for (var k in holidayIcs) {
    var holiday = moment(holidayIcs[k].start)
    holidays[holiday.format('YYYY-MM-DD')] = holidayIcs[k].summary;
  }
}

function makeHolidayFileName() {
  var currentYear = moment().year();
  var HOLIDAY_FILE_PREFIX = 'public-holidays-sg-';
  return HOLIDAY_FILE_PREFIX + currentYear + '.ics';
}

// helper function: check if today is holiday, can only detect fixed holiday currently.
function checkHolidays(dateTime) {
  var dateString = dateTime.format('YYYY-MM-DD');
  var day = holidays[dateString];
  if (day) {
    console.log(dateTime.format('YYYY-MM-DD HH:mm:ss') + ' | Today is ' + day + ', have a nice day');
    return true;
  }
  return false;
}

// helper function: return a random number of seconds.
function randomMillis() {
  if (isTestingMode()) {
    return 1;
  }
  return Math.round(Math.random() * timeOptions.WAIT_RANGE);
}

function signIn() {
  if (!checkHolidays(moment())) {
    sendRequest(operations.SIGN_IN, responseCallback('出社打刻成功'));
  }
}

function signOut() {
  if (!checkHolidays(moment())) {
    sendRequest(operations.SIGN_OUT, responseCallback('退社打刻成功'));
  }
}

// parsing arguments.
var opts = parameters.parseSystem();
var args = opts.options;

// recognize the first two unnamed args as username and password.
if (opts.argv.length == 2) {
  args['username'] = opts.argv[0];
  args['password'] = opts.argv[1];
}

// exit if required args are not provided.
if (!args['username'] || !args['password']) {
  parameters.showHelp();
  process.exit(0);
}

loadPublicHoliday(path.resolve(HOLIDAY_DIR, makeHolidayFileName()));

if (!args['once']) {
  schedule.scheduleJob(timeOptions.SIGN_IN_TIME, function() {
    setTimeout(signIn, randomMillis());
  });

  schedule.scheduleJob(timeOptions.SIGN_OUT_TIME, function() {
    setTimeout(signOut, randomMillis());
  });

  console.log("Dake job scheduled for " + args['username'] + '!');
}

if (args['immediate'] || args['once']) {
  signIn();
}
