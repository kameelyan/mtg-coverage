# MtgCoverage

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.4 and requires NodeJS to run.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` for a build of the coverage files. Requires the zip cli (native to Linux/MacOS [Look into 7z for Windows]) to complete.
If the build fails and you have an existing dist folder, try deleting that folder and building again.

## After Build

Edit the /dist/coverage/server/config/index.js file to point to a directory where you'd like the .txt files written to.
In the /dist/coverage folder, execute Start.bat to run the Node Servers.

