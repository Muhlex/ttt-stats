# Trouble in Taskforce Town — Statistics
This is a tool to display comprehensive statistics from the
[Trouble in Taskforce Town](https://github.com/Muhlex/iw4x-ttt)
custom gamemode for IW4X. It can be configured to read any log file
created by the most recent version of the gamemode.
The data will be parsed and evaluated directly in the browser.

**Check out the live version at https://stats.murl.is/**

## Features
* Overview for round and item data
* Detailed per player statistics and graphs
* Leaderboards for various metrics

## About
| Category          | Technology       | Notes                                                                                                          |
|-------------------|------------------|----------------------------------------------------------------------------------------------------------------|
| Frontend Toolkit  | Vite             | Firefox cannot yet run module-type Web Workers.<br>Thus, it can't run the development build that Vite generates. |
| UI Framework      | Svelte           |                                                                                                                |
| Data handling     | JS & Web Workers |                                                                                                                |
