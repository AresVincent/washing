module.exports={
    configureWebpack: config => {
        //生產環境取消 console.log
        if (process.env.NODE_ENV === 'production') {
          config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
      },
    devServer:{
        port:3001,
        open:true,
        https:true
    },
}