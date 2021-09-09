const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

    mode: 'development',

    output:{
        clean: true
    },

    module: {
        rules: [
            {
            
            },
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
            }
        ]
    },
    plugins: [
            new MiniCssExtract({
                filename: '[name].css',
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