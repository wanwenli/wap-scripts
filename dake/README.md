DaKe script
===

### Installation

```sh
npm install
```

### Quickstart
```sh
npm start [userId] [password]
```

Example

```sh
npm start S146 3533335qaz
```

### Immediate sign-in

You can *immediately* sign in after the first launch by adding an `-i` argument.

```sh
npm start -- [userId] [password] -i
```

Example

```sh
npm start -- S146 3533335qaz -i
```

### Sign-in once only (mainly for windows users)

You can sign in once only and then the program exits.
Use the command below in Windows task scheduler.

First change userId and password in dake.bat

Open windows task scheduler and click "Create Basic Task"

input "Name" (use "Dake" as a example) and click "Next"

Choose "Daily" and click "Next"

Change Time of "start" To "10:15:09"(am)(That would be the time of run bat) and Click "Next"

Choose "Start a program" and click Next

Browse the bat file (for example : E:\dake\dake.bat) and input "E\dake\" in "Start in(optional)"

Then Finish !

You can find "Dake" in "task Scheduler library". Double click to open it and click on "Conditions"

Select "Wake the computer to run this task".


```sh
node dake.js [userId] [password] -o
```

Example

```sh
node dake.js S146 3533335qaz -o
```

### Check logs

```sh
npm run logs
```

### Stop

```sh
npm stop
```
### Run on Docker (deprecated)

The inner clock of docker has huge discrepancy compared to the real clock.
This issue has not been resolved yet.

```sh
docker build -t dake .
docker run -d dake [username] [password]
```

### TODO

* Upgrade source code to ES6
