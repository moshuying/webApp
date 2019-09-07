module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/47.107.231.9" : "/",
  outputDir: "dist",
  assetsDir: "static",
  runtimeCompiler: false,
  lintOnSave: true,
  transpileDependencies: [],
  productionSourceMap: false,
  css: {
    // 是否开启支持 foo.module.css 样式
    modules: false,
    // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
    extract: true,
    // 是否构建样式地图，false 将提高构建速度
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      css: {
        // options here will be passed to css-loader
      },
      postcss: {
        // options here will be passed to postcss-loader
      }
    }
  },
  devServer: {
    open: true,
    host: "127.0.0.1",
    port: 3000,
    https: false,
    hotOnly: false,
    proxy: {
      "/?temo": {
        target: "https://zk.sceea.cn",
        chageOrigin: true,
        ws: true
      }
    }
  }
};
