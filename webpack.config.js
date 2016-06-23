const path = require('path');
const webpack = require('webpack');
//多入口配置，用于优化提取出公共内容
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    //单入口配置
    /*entry: getEntrySources([path.resolve(__dirname, './src/entry.js')]),
    output: {
        publicPath: "http://localhost:9090/dist/",
        path: "./dist/js",
        filename: "bundle.js"
    },*/
    //多入口配置
    entry: {
        index : getEntrySources([path.resolve(__dirname, './src/index.js')]),
    },
    output: {
        publicPath: "http://localhost:9090/dist/",
        path: "./dist/js",
        filename: "[name].js"
    },
    devServer:{//本地测试服务器配置
        contentBase: 'src', //静态资源的目录
        devtool: 'source-map',
        hot: true, //自动刷新
        inline: true,    
        port: 9090
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    eslint: {
        configFile: ".eslintrc.js",
        emitWarnings: true
    },
    //devtool: 'source-map',
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
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015','react'],
                    plugins: [['antd', { 'style': true }]]
                }
            },
            {
                test: /\.jsx$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015','react'],
                    plugins: [['antd', { 'style': true }]]
                }
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
        }),
        //多入口配置，用于优化提取出公共内容
        commonsPlugin
    ]
};

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:9090');
        sources.push('webpack/hot/only-dev-server');
    }
    return sources;
}