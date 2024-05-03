# Country Connect

## About the app
A short game made during Spring 2024 for COMP-225 at Macalester, about connecting two countries. Try to make a path by guessing the names of the bordering countries in the fewest guesses possible. 

This app was made in Svelte.

## How to Install/Use
Find the project file in your terminal then run the following to install the dependencies
```bash
npm install
```
```bash
npm i -D simple-svelte-autocomplete
```
After installing dependencies, run the following to run the game on a localhost
```bash
npm run dev
```


Navigate to [localhost:8080](http://localhost:8080), to start playing the game. 

## Future geographical changes

Our app uses data from the following CSVs. If there are future geographical updates, follow the directions in the make_un_borders.py file to re-upload the CSVs and then regenerate the javascript objects used to run the game.

un_countries.csv from https://stefangabos.github.io/world_countries/
borders.csv from https://github.com/geodatasource/country-borders
