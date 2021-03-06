const CracoLessPlugin = require('craco-less');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');// dayjs 替换 momentjs
const path = require("path");
const PROXY = process.env.PROXY;
const addProxy = proxy => config => {
  config.proxy = proxy
  return config
}
const pathResolve = pathUrl => path.resolve(__dirname, pathUrl);

module.exports = {
  /* eslint: {
    enable: true,
    mode: ".eslintrc"
  }, */
  webpack: {
    alias: {
      '@': pathResolve('src'),
    },
    plugins: [
      new BundleAnalyzerPlugin(),
      new AntdDayjsWebpackPlugin()
    ]
  },
  babel: {
    plugins: [
      ['import', { libraryName: 'antd', "libraryDirectory": "es", style: true }],
      ['@babel/plugin-proposal-decorators', { legacy: true }]
    ]
  },
  devServer: addProxy({
    '/api': {
      target: PROXY,
      changeOrigin: true,
      cookieDomainRewrite: "localhost"
    },
  }),
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1890ff' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};