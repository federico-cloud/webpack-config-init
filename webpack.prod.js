const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports = {

    mode: 'production',

    output:{
        clean: true,
        filename: 'main.[contenthash].js'
    },

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/,
                exclude: /estilos.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /estilos.css$/,
                use: [MiniCssExtract.loader, 'css-loader'],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },
    optimization:{
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser(),
        ]
    },

    plugins: [
            new MiniCssExtract({
                filename: '[name].[fullhash].css',
                ignoreOrder: false
            }),
            new HtmlWebPack({
                title: 'Mi webpack app',
                //filename: 'holamundo.html',
                template: 'src/index.html',
            }),
            new CopyPlugin({
                patterns: [
                    {from: 'src/assets/', to: 'assets/'}
                ]
            }) 
    ]

}