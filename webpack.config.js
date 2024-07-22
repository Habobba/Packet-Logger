const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.tsx',
        mode: isProduction ? 'production' : 'development',
        output: {
            filename: 'bundle.min.js',
            path: path.resolve(__dirname, 'dist')
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
                {
                    test: /\.css$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader'
                    ],
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(argv.mode),
            }),
            new webpack.BannerPlugin({
                raw: true,
                banner:
                    `// ==UserScript==\n` +
                    `// @name        Habobba - Master Script\n` +
                    `// @namespace   Habobba Scripts\n` +
                    `// @match       https://www.habblet.city/hotelv2\n` +
                    `// @grant       none\n` +
                    `// @version     1.0\n` +
                    `// @author      CoreDuo\n` +
                    `// @description Uma ferramenta feita sob medida.\n` +
                    `// ==/UserScript==`,
                stage: webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT,
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html'
            })
        ],
        optimization: {
            minimize: true,
            minimizer: [new TerserWebpackPlugin({
                extractComments: false,
            })],
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'public'),
            },
            compress: true,
            port: 9000,
            hot: true,
            watchFiles: ['src/**/*', 'public/**/*'],
        },
    }
}
