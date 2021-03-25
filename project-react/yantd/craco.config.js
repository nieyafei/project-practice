const path=require('path');

// const react_scripts_path=require.resolve('react-scripts/package.json');
// webpack dev server 增加输出html文件
/* const dev_server_options_path=require.resolve('webpack-dev-server/lib/options.json', [react_scripts_path]);
const dev_server_options=require(dev_server_options_path);
dev_server_options.properties.writeToDisk={instanceof:'Function'}; */

// const fse=require(require.resolve('fs-extra', [react_scripts_path]));

function bundle_analyzer(plugins){
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
    plugins.push(new BundleAnalyzerPlugin());
    plugins.push(new AntdDayjsWebpackPlugin());
}

function webpack(config, env){
    //multi-entry begin
    //此处必须保证有main的entry具体原因需要花时间搞清楚
    config.output.filename='static/js/[name].bundle.js'
    const {entry}=config;
    config.entry={main: path.resolve(__dirname,'src/indexEmp.tsx')};
    const main_html_webpack_plugin=config.plugins[0];
    main_html_webpack_plugin.options.chunks=['main'];
    config.output = {
      path: path.resolve(__dirname,'build'),//绝对路径
    　filename:'[name].js'
    }
    //multi-entry end

    /* if(process.env.bundle_analyzer){
        bundle_analyzer(config.plugins);
    } */
    /* config.resolve.alias['@']=`${__dirname}/src`; */
    // add babel plugin begin
    /* const babel_loaders=[].concat(...config.module.rules.map(rule=> rule.oneOf && rule.oneOf.filter(loader=> loader.loader && loader.loader.includes('babel-loader'))).filter(item=> item && item.length>0));
    for(const loader of babel_loaders){
      if(loader.options.plugins){
        loader.options.plugins.push('@babel/plugin-proposal-export-default-from');
        loader.options.plugins.push('@babel/plugin-proposal-optional-chaining');
      }
    } */
    // add babel plugin end
    return config;
}

function devServer(config){
  //删除文件，从而proxy可以通过监控文件是否生成了来提供服务
  /* for(const name of ['index']){
    fse.removeSync(path.resolve(__dirname, `./dist/${name}.html`));
  }
  config.writeToDisk= (filePath)=> {
    return /.*\.html$/.test(filePath);
  };
  return config; */
}
module.exports={
  webpack:{configure:webpack},
}