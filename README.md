# webpack-quick-start
A quick-start demo for webpack.  Let you know how to use webpack.

This article is notes of [https://survivejs.com/webpack](https://survivejs.com/webpack "https://survivejs.com/webpack")

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

- Bundle Splitting

So far, the project has only a single entry named as `app`. The configuration tells webpack to traverse dependencies starting from the app entry directory and then to output the resulting bundle below the build directory using the entry name and .js extension.

With bundle splitting, you can push the vendor dependencies to a bundle of their own and benefit from client level caching.

Doing this,

```javascript
const productionConfig = merge([

  {
    entry: {
      vendor: ['react'],
    },
  },
  ...
]);
```
we will get

[![https://user-images.githubusercontent.com/7261281/26921064-750cb094-4c6d-11e7-9e74-c968262dd9bd.png](https://user-images.githubusercontent.com/7261281/26921064-750cb094-4c6d-11e7-9e74-c968262dd9bd.png "https://user-images.githubusercontent.com/7261281/26921064-750cb094-4c6d-11e7-9e74-c968262dd9bd.png")](https://user-images.githubusercontent.com/7261281/26921064-750cb094-4c6d-11e7-9e74-c968262dd9bd.png "https://user-images.githubusercontent.com/7261281/26921064-750cb094-4c6d-11e7-9e74-c968262dd9bd.png")

app.js and vendor.js have separate chunk IDs right now given they are entry chunks of their own.

`CommonsChunkPlugin ` makes things as follow ,

[![https://user-images.githubusercontent.com/7261281/26921579-1a9d7ede-4c6f-11e7-85c5-febb2e4793cb.png](https://user-images.githubusercontent.com/7261281/26921579-1a9d7ede-4c6f-11e7-85c5-febb2e4793cb.png "https://user-images.githubusercontent.com/7261281/26921579-1a9d7ede-4c6f-11e7-85c5-febb2e4793cb.png")](https://user-images.githubusercontent.com/7261281/26921579-1a9d7ede-4c6f-11e7-85c5-febb2e4793cb.png "https://user-images.githubusercontent.com/7261281/26921579-1a9d7ede-4c6f-11e7-85c5-febb2e4793cb.png")

- Minifying

`babili-webpack-plugin`

`optimize-css-assets-webpack-plugin`

`cssnano`

`webpack.DefinePlugin`

- Adding Hashes to Filenames

The most valuable placeholders are [name], [chunkhash], and [ext].

If you are using ExtractTextPlugin, you should use [contenthash].

- Separating a Manifest

If the hashes webpack generates change, then the manifest changes as well. As a result, the contents of the vendor bundle change, and become invalidated. The problem can be eliminated by extracting the manifest to a file of its own or by writing it inline to the index.html of the project.

```javascript
const productionConfig = merge([
  ...
  parts.extractBundles([
      {
        ...
      },

      {
        name: 'manifest',
        minChunks: Infinity,
      },

  ]),
  ...
]);
```

The name manifest is used by convention. You can use any other name and it will still work. It's important that the definition is after others, though, as it has to capture what has not been extracted yet. minChunks is optional in this case and passing Infinity tells webpack not to move any modules to the resulting bundle.

































