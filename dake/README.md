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

### Check logs

```sh
npm run logs
```

### Stop

```sh
npm stop
```
### Run on Docker

```sh
docker build -t dake .
docker run -d dake [username] [password]
```

### TODO

* Upgrade source code to ES6
