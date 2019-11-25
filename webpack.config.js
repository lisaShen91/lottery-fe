/**
 * Created by shenlisha on 2019/3/13.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        app: './src/app/app.js',
        data: ['./src/data/persons', './src/data/presents']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, './node_modules')
            },
            {
                test: /\.vdt$/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'vdt-loader',
                        options: {
                            skipWhitespace: true,
                            noWith: true,
                            delimiters: ['{{', '}}']
                        }
                    }
                ]
            },
            {
                test: /\.(styl|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers: ['last 2 versions', 'ie >= 9']
                                })
                            ]
                        }
                    },
                    {
                        loader: 'stylus-loader',
                        options: {
                            'include css': true,
                            sourceMap: false,
                            'resolve url': true,
                            import: path.resolve(__dirname, './node_modules/kpc/@stylus/styles/themes/ksyun/index.styl')
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg|png|jpg|gif|jpeg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            outputPath: './fonts/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '抽奖程序',
            filename: 'index.html',
            template: 'index.html'
        }),
        new webpack.ProvidePlugin({
            Intact: 'intact',
            _: 'underscore',
            $: 'jquery',
            utils: path.resolve(__dirname, 'src/core/utils'),
            download: 'downloadjs'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    mode: 'development',
    resolve: {
        extensions: ['.js'],
        alias: {
            kpc: 'kpc/@stylus',
            src: path.resolve(__dirname, './src')
        }
    },
    devServer: {
        port: 8890
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
};
