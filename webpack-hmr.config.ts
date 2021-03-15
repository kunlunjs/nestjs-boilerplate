import { Configuration } from 'webpack'
import nodeExternals from 'webpack-node-externals'

// TODO
// nest build --watch --webpack --webpackPath webpack-hmr.config.ts 暂不可用，待解决
// Error  Cannot use import statement outside a module
export default function config(
  options: Configuration,
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  webpack: any
): Configuration {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100']
      })
    ],
    plugins: [
      ...options.plugins,
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/]
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  } as Configuration
}
