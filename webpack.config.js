const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
        assetModuleFilename: "assets/[hash][ext]",
        clean: true,
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /.(ts|tsx|js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /.(css)$/,
                use: ["style-loader", { loader: "css-loader", options: { modules: true } }]
            },
            {
                test: /.(jpeg|png)$/,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./src/index.html",
            inject: true
        })
    ],
    devServer: {
        static: "./dist",
        port: 3000,
    },
    devtool: 'eval-source-map',
}