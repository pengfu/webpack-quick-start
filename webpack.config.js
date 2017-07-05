const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'dist'),
    componentPath:path.join(path.resolve(__dirname),'app','components'),
    stylePath:path.join(path.resolve(__dirname),'app','style')
};
const commonConfig = merge([
    {
        entry: {
            app:path.join(PATHS.app,'index.js')
        },
        output: {
            path: PATHS.build,
            filename: '[name].[chunkhash:8].js',
        },
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(PATHS.app,'index.html'),
                filename: path.join(PATHS.build,'index.html'),
                inject: 'body'
            }),
        ],
    },

    parts.loadJS()
]);

const productionConfig = merge([
    {
        // entry: {
        //     vendor: ['react']
        // },
        // plugins: [
        //     //生成环境使用，可减小压缩体积
        //     new webpack.optimize.UglifyJsPlugin({
        //         compress: {
        //             warnings: false
        //         },
        //         sourceMap: true
        //     }),
        // ],
    },
    parts.minifyJavaScript(),
    parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
    ),
    parts.minifyCSS({
        options: {
            discardComments: {
                removeAll: true,
            },
            // Run cssnano in safe mode to avoid
            // potentially unsafe transformations.
            safe: true,
        },
    }),
    parts.extractBundles([
        {
            name: 'vendor',
            minChunks: ({ resource }) => (
                resource &&
                resource.indexOf('node_modules') >= 0 &&
                resource.match(/\.js$/)
            ),
        },
        {
            name: 'manifest',
            minChunks:Infinity
        }
    ]),

    parts.extractCSS({
        use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
        ],
        include: PATHS.stylePath,
        filename: 'style.[contenthash:8].css',
    }),
    parts.extractCSS({
        use: [
            { loader: 'css-loader', options: { modules:true,importLoaders: 1 } },
            'postcss-loader'
        ],
        include: PATHS.componentPath,
        filename: 'component.[contenthash:8].css',
    }),
    parts.loadImage(),
    parts.loadResource(),
    parts.generateSourceMaps({ type: 'source-map' }),

]);

const developmentConfig = merge([
    parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.loadCSS({
        use: [  'style-loader',
                { loader: 'css-loader', options: { modules:true,importLoaders: 1 } },
                'postcss-loader'
        ],
        include: PATHS.componentPath,
    }),
    parts.loadCSS({
        use: [  'style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
        ],
        include: PATHS.stylePath,
    }),
    parts.loadImage(),
    parts.loadResource(),
    parts.generateSourceMaps({ type: 'source-map' }),
]);

module.exports = (env) => {
    if (env === 'production') {
        return merge(commonConfig, productionConfig);
    }

    return merge(commonConfig, developmentConfig);
};