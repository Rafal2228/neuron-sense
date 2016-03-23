module.exports = {
    entry: "./main.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    target: 'async-node',
    module: {
        loaders: [
            {
              test: /\.css$/,
              loader: "style!css"
            },
            {
              test:  /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              query: {
                presets: ['es2015']
              }
            }
        ]
    }
};
