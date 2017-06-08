const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
    componentPath:path.join(path.resolve(__dirname),'app','components'),
    stylePath:path.join(path.resolve(__dirname),'app','style')
};
const commonConfig = merge([
    {
        entry: path.join(PATHS.app,'index.js'),
        output: {
            path: PATHS.build,
            filename: '[name].[hash].js',
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
        plugins: [
            //生成环境使用，可减小压缩体积
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                sourceMap: true
            }),
        ],
    },
    // parts.extractCSS({
    //     use: ['css-loader', parts.autoprefix()],
    // }),

    parts.extractCSS({
        use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
        ],
        include: PATHS.stylePath,
        filename: 'style.[hash].css',
    }),
    parts.extractCSS({
        use: [
            { loader: 'css-loader', options: { modules:true,importLoaders: 1 } },
            'postcss-loader'
        ],
        include: PATHS.componentPath,
        filename: 'component.[hash].css',
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