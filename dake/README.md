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
