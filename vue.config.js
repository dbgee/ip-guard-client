module.exports = {
    chainWebpack: config =>{
        config.plugin('html')
            .tap(args => {
                args[0].title = "IP Guard";
                return args;
            })
    },
    devServer:{
        host:'0.0.0.0',
        port:'8081',
        open:true,
        proxy:{ //配置跨域
            '/':{
                target:'http://localhost:8080/',
                ws:true,
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}
