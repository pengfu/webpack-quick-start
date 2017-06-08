const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        historyApiFallback: true,
        stats: 'errors-only',
        host, // Defaults to `localhost`
        port, // Defaults to 8080
        overlay: {
            errors: true,
            warnings: true,
        },
    },
});

exports.loadCSS = ({ include, exclude, use } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,
                use,
            },
        ],
    },
});

exports.loadJS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include,
                exclude,
                // use: [{
                //     loader:'babel-loader',
                //     query: {
                //         presets: ['es2015']
                //     }
                // }],
                use:'babel-loader'
            },
        ],
    },
});

exports.extractCSS = ({ include, exclude, use, filename }) => {
    // Output extracted CSS to a file
    const plugin = new ExtractTextPlugin({
        filename
    });

    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include,
                    exclude,

                    use: plugin.extract({
                        use,
                        fallback: 'style-loader',
                    }),
                },
            ],
        },
        plugins: [ plugin ],
    };
};

exports.loadImage = (include, exclude) => ( {
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                include,
                exclude,
                use:[{
                    loader:'url-loader',
                    options: {
                        limit: 1024,
                        name: 'img/[name].[hash:7].[ext]'
                    }
                }]
            },
        ],
    },

}),

exports.loadResource = (include, exclude) => ( {
    module: {
        rules: [
            {
                test: /\.(svg|woff2?|eot|ttf|otf)(\?.*)?$/,
                include,
                exclude,
                use:[{
                    loader:'url-loader',
                    options: {
                        limit: 10240,
                    }
                }]
            },
        ],
    },

}),

exports.autoprefix = () => ({
    loader: 'postcss-loader',
    options: {
        plugins: () => ([
            require('autoprefixer')(),
        ]),
    },
});

exports.generateSourceMaps = ({ type }) => ({
    devtool: type,
});