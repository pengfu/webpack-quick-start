# webpack-quick-start
A quick-start demo for webpack.

## How to use
`npm install && npm start`

## Description
- html-webpack-plugin

To keep things convenient to maintain, you can use your first plugin: `html-webpack-plugin`. HtmlWebpackPlugin generates an index.html for the application and adds a script tag to load the generated bundle. Install it:

`npm install html-webpack-plugin --save-dev`

- webpack-dev-server (WDS)

`WDS` is a development server running in-memory, meaning the bundle contents aren't written out to files, but stored in memory. Install it:

`npm install webpack-dev-server --save-dev`