const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: getEntrySources([path.resolve(__dirname, './src/entry.js')]),
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
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({//将React切换到产品环境
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,//删除JS中的注释
            },
            compress: {
                warnings: false
            }
        })
    ]
};

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:9090');
        sources.push('webpack/hot/only-dev-server');
    }
    return sources;
}