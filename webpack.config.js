const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const src_path = './static/src/';

module.exports = {
    context: __dirname,
    entry: {
        'index.js': src_path + "index.js",
    },
    output: {
        filename: "[name]",
        path: path.resolve(__dirname, 'static', 'dist'),
        publicPath: '/static/dist/',
    },
    module: {
        rules: [
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            },
            {
                test: /\.(eot|ttf|svg)$/,
                loader: 'file-loader',
            },
            {
                test: /\.(png|jpg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: './img/[name].[ext]',
                    }
                }
            },
            {
                test: /\.(css|styl)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader'],
                })
            },
            {
                test: /\.woff$/,
                loader: 'url-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    }
                }
            },
        ]
    },
    resolve: {
        alias: {

        },
        extensions: [".js", '.css', '.styl', '.hbs']
    },
    plugins: [
        new ExtractTextPlugin({filename: 'styles.css'}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Popper: ['popper.js', 'default']
        })
    ],
    node: {
        fs: 'empty'
    },
};