 
 const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");
 

module.exports = {
    mode: "development",
    entry: {

        home: { import: "./src/home/entry.ts"} 
    },
    output: {
        
        path: path.resolve(__dirname,  "wwwroot"),
        filename: "[name].js",
        publicPath: "",
        clean: true,
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env']],
                        plugins: [
                            [
                                '@babel/plugin-transform-react-jsx',
                                {
                                    runtime: 'automatic',
                                    importSource: path.resolve(__dirname + '/./'),
                                },
                            ],
                        ],
                    },
                },
            },


            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            },

            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        

            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                // More information here https://webpack.js.org/guides/asset-modules/
                type: "asset",
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/home/index.html",
            chunks: ["home"],
            filename: "home.html"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
    ]
};