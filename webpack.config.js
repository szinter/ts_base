const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        'webapp/index': {
            import: './webapp/index.ts',
        },
        'server/app': {
            import: './server/index.ts',
        }// add boundle splits here
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                    },
                ],
            },
            {
                test: /.*[\\,\/]webapp[\\,\/].*\.(png|svg|jpg|jpeg|gif)$/i,
                exclude: /webapp\/assets\/static\/*$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'webapp/assets/[hash][ext]',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'TS base template',
            template: './webapp/index.html',
            filename: 'webapp/index.html',
            inject: false,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'assets/static',
                    to: 'webapp/assets/static',
                    context: 'webapp/',
                } 
            ]
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    devServer: {
        static: {
            directory: './dist/webapp',
        }
    },
    devtool: 'inline-source-map',
};