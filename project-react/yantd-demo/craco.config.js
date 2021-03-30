const path=require('path');

const react_scripts_path=require.resolve('react-scripts/package.json');
const names=require('./craco.names.json');
// webpack dev server 增加输出html文件
const dev_server_options_path=require.resolve('webpack-dev-server/lib/options.json', [react_scripts_path]);
const dev_server_options=require(dev_server_options_path);
dev_server_options.properties.writeToDisk={instanceof:'Function'};

const HtmlWebpackPlugin = require(require.resolve('html-webpack-plugin', [react_scripts_path]));

const fse=require(require.resolve('fs-extra', [react_scripts_path]));

function absolute_path(name){
    return path.resolve(__dirname, `./src/${name}.tsx`);
}

function wrap_entry(path, entry){
  if(Array.isArray(entry) && entry.length>1){
      return [entry[0], path];
  }
  return path;
}

function load_eslintrc(){
    return JSON.parse(fse.readFileSync('./.eslintrc', 'utf8'));
}

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
    config.entry={main:entry};
    const main_html_webpack_plugin=config.plugins[0];
    main_html_webpack_plugin.options.chunks=['main'];
    for(const name of names){
        config.entry[name]=wrap_entry(absolute_path(name), entry);
        const template=path.resolve(__dirname, `./public/${name}.html`);
        const plugin=new HtmlWebpackPlugin({...main_html_webpack_plugin.options, template, filename:`${name}.html`, chunks:[name]});
        config.plugins.push(plugin);
    }
    //multi-entry end

    if(process.env.bundle_analyzer){
        bundle_analyzer(config.plugins);
    }
    /* config.resolve.alias['@']=`${__dirname}/src`; */
    // eslintrc begin
   /*  const [eslint_loader]=[].concat(...config.module.rules.map(rule=>rule.use && rule.use.filter(loader=>loader.loader && loader.loader.includes('eslint-loader'))).filter(item=> item && item.length>0));
    if(eslint_loader){
        const eslintrc=load_eslintrc();
        eslint_loader.options;
        const {extends:_, ...other}=eslintrc;
        Object.assign(eslint_loader.options, other);
    } */
    // eslintrc end
    // add babel plugin begin
    const babel_loaders=[].concat(...config.module.rules.map(rule=> rule.oneOf && rule.oneOf.filter(loader=> loader.loader && loader.loader.includes('babel-loader'))).filter(item=> item && item.length>0));
    for(const loader of babel_loaders){
        if(loader.options.plugins){
            loader.options.plugins.push('@babel/plugin-proposal-export-default-from');
            loader.options.plugins.push('@babel/plugin-proposal-optional-chaining');
        }
    }
    // add babel plugin end
    return config;
}

function devServer(config){
    //删除文件，从而proxy可以通过监控文件是否生成了来提供服务
    for(const name of ['index', ...names]){
        fse.removeSync(path.resolve(__dirname, `./dist/${name}.html`));
    }
    config.writeToDisk= (filePath)=> {
        return /.*\.html$/.test(filePath);
    };
    return config;
}
module.exports={
    eslint: {
      enable: true,
      mode: ".eslintrc"
    },
    devServer,
    webpack:{configure:webpack},
}