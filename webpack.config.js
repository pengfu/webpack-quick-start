const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
};
const commonConfig = merge([
    {
        entry: path.join(PATHS.app,'js/entry.js'),
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
                }
            }),
        ],
    },
    parts.extractCSS({ use: 'css-loader' }),
]);

const developmentConfig = merge([
    parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.loadCSS(),
]);

module.exports = (env) => {
    if (env === 'production') {
        return merge(commonConfig, productionConfig);
    }

    return merge(commonConfig, developmentConfig);
};