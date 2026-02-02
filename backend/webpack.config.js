import path from "path";
import { fileURLToPath } from "url";
import nodeExternals from "webpack-node-externals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('webpack').Configuration} */
const config = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  target: "node",
  externalsPresets: { node: true },
  entry: "./server.ts",
  bail: process.env.NODE_ENV === "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.cjs",
    chunkFilename: "[name].js",
    assetModuleFilename: "assets/[name][ext][query]",
    clean: true,
    library: {
      type: "commonjs2",
    },
  },
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
  resolve: {
    extensions: [".ts", ".js"],
    extensionAlias: {
      ".js": [".ts", ".js"],
    },
    modules: [path.resolve(__dirname, "."), "node_modules"],
    mainFields: ["module", "main"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  externals: [
    nodeExternals({
      allowlist: [/^node:/],
    }),
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
  devtool:
    process.env.NODE_ENV === "production" ? "source-map" : "eval-source-map",
  optimization: {
    minimize: process.env.NODE_ENV === "production",
  },
  watchOptions: {
    ignored: ["**/node_modules/**", "**/dist/**"],
  },
  performance: {
    hints: false,
  },
  infrastructureLogging: {
    level: "warn",
  },
  stats: "errors-warnings",
};

export default config;