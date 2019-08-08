# Installation
## Dev mode
Install dependencies
```bash
npm i
```
Rename '.env-sample' file to '.env' and enter your variables

Launch server in terminal/console
```bash
npm run server-dev
```
Launch client in another terminal/console
```bash
npm run client-dev
```

## Prod mode
Install dependencies
```bash
npm i --production
```
Rename '.env-sample' file to '.env' and enter your variables

Build server and client
```bash
npm run client-build
npm run server-build
```

Launch
```bash
npm run server-prod
```

## Notes
Every env has its own log file for errors and warnings separately

When you run tests provided database get cleared at the beginning and end of the test SO be carefull

