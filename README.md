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

- Composing Configuration

Use `webpack-merge` to compose configuration . Below is the useage of webpack-merge.

```shell
> merge = require('webpack-merge')
...
> merge(
... { a: [1], b: 5, c: 20 },
... { a: [2], b: 10, d: 421 }
... )
{ a: [ 1, 2 ], b: 10, c: 20, d: 421 }
```

Now we have :`webpack.parts.js`  `webpack.config.js`

- ExtractTextPlugin

Webpack provides a means to generate a separate CSS bundles using `ExtractTextPlugin`. It can aggregate multiple CSS files into one. For this reason, it comes with a loader that handles the extraction process. The plugin then picks up the result aggregated by the loader and emits a separate file. Install it,

`npm install extract-text-webpack-plugin --save-dev`

- Autoprefixing

Achieving autoprefixing takes a small addition to the current setup. Install postcss-loader and autoprefixer first:

`npm install postcss-loader autoprefixer --save-dev`

Add a fragment enabling autoprefixing:

webpack.parts.js

```javascript
exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      require('autoprefixer')(),
    ]),
  },
});
```

- browserslist

Autoprefixer and some other tools rely on Browserslist will find its config automatically.

[https://www.npmjs.com/package/browserslist](https://www.npmjs.com/package/browserslist "https://www.npmjs.com/package/browserslist")

- .babelrc

Given webpack supports ES6 modules out of the box

[https://www.npmjs.com/package/babel-preset-env](https://www.npmjs.com/package/babel-preset-env "https://www.npmjs.com/package/babel-preset-env")

- SourceMap

Source maps  provide a mapping between the original and the transformed source code so that you can debug in a browser.

When used with  `UglifyJsPlugin` , you should set sourceMap to be true.
```javascript
new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      output: {comments: false},
      sourceMap: true
    })
```

Webpack supports  different Source Map Types.

`devtool: 'source-map'`  `devtool: 'cheap-module-source-map'` and so on.
