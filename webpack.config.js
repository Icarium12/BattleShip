import path from "node:path";
import test from "node:test";

export default {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(import.meta.dirname, "dist"),
        clean: true,
    },
    module: {
        rules: [
            {
             test: /\.css$/i,
            use: ["style-loader", "css-loader"],   
            },
            
        ],
    },
};