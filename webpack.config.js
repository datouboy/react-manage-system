const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:9090',
        path.resolve(__dirname, './src/entry.js')
    ],
    output: {
        publicPath: "http://localhost:9090/dist/",
        path: "./dist/js",
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    eslint: {
        configFile: ".eslintrc.js",
        emitWarnings: true
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192[path][name].[ext]'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader!jsx-loader?harmony',
                exclude: /node_modules/
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader!jsx-loader?harmony',
                exclude: /node_modules/
            }
        ]
    }
};