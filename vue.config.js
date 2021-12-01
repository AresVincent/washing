module.exports = {

    devServer: {
        port: 3000,
        proxy: {
         /* '/api': {
            target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro', //mock API接口系统
            ws: false,
            changeOrigin: true,
            pathRewrite: {
              '/jeecg-boot': ''  //默认所有请求都加了jeecg-boot前缀，需要去掉
            }
          },*/
          '/api': {
            target: 'http://localhost:3000', //请求本地 需要jeecg-boot后台项目
            ws: false,
            changeOrigin: true
          },
        }
      },
    
    lintOnSave: undefined
}