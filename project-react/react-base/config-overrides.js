const { override, fixBabelImports, addLessLoader, addWebpackPlugin, overrideDevServer, useEslintRc } = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const NE = process.env.NODE_ENV;
const PROXY = process.env.PROXY;
const addProxy = proxy => config => {
  config.proxy = proxy
  return config
}

module.exports = {
  webpack: override(
    useEslintRc('.eslintrc'),
    /* fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }), */
    /* addLessLoader({
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#10325e' },
    }), */
    // addWebpackPlugin(new AntdDayjsWebpackPlugin())
  ),
  devServer: overrideDevServer(
    addProxy({
      '/api': {
        target: PROXY,
        changeOrigin: true,
        cookieDomainRewrite: "localhost"
      },
    })
  )
}
