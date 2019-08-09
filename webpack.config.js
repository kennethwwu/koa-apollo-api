const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: "development",
    target: "node",
    externals: [nodeExternals()],
    devtool: "inline-source-map",
    watch: true,
    watchOptions: {
        ignored: ['dist', 'node_modules']
    },
    entry: "./src/app.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "app.js"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { 
                test: /\.tsx?$/, 
                loader: "awesome-typescript-loader", 
                exclude: /node_modules/ 
            }
        ]
    },
    plugins: [
        new CheckerPlugin()
    ]
};