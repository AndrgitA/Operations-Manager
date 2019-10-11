const path = require('path');
const webpack = require('webpack');
process.env.VUE_APP_DATE_DEPLOY = new Date();

module.exports = {
    // publicPath: process.env.NODE_ENV === 'production'
    //     ? '/panel/'
    //     : '/',
    publicPath: '/',                      // -> process.env.BASE_URL
    chainWebpack: config => {
        config.module.rules.delete('eslint');
        
        const svgRule = config.module.rule('svg');
        svgRule.uses.clear();
        svgRule 
            .use('vue-svg-loader')
            .loader('vue-svg-loader');
    },
    css: {
        // loaderOptions: {
        //     sass: {
        //         data: `
        //             @import "~styles/variables";
        //             @import "~styles/mixins";
        //         `
        //     }
        // }
    },
    configureWebpack: {
        resolve: {
            // extensions: ['.js', '.vue', '.json'],
            alias: {
                'fonts': path.resolve('src/assets/fonts'),
                'icons': path.resolve('src/assets/icons'),
                'styles': path.resolve('src/assets/styles'),
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
        module: {
            rules: [
                {
                    test: /\.s[a|c]ss$/,
                    use: [ /*'style-loader', 'css-loader', */ 'sass-loader', {
                        loader: 'style-resources-loader',
                        options: {
                            patterns: [
                                path.resolve(__dirname, './src/assets/styles/variables.scss'),
                                path.resolve(__dirname, './src/assets/styles/mixins.scss')
                            ]
                        }
                    }]
                }
            ]
        },
        // module: {
        //     rules: [
        //         {
        //             test: /\.svg$/,
        //             loader: 'vue-svg-loader', // `vue-svg` for webpack 1.x
        //             options: {
        //             // optional [svgo](https://github.com/svg/svgo) options
        //                 svgo: {
        //                     plugins: [
        //                         {removeDoctype: true},
        //                         {removeComments: true}
        //                     ]
        //                 }
        //             }
        //         },
        //     ],
        // },
        plugins: [

        ]
    },
    devServer: {
        host: '0.0.0.0',
        hot: true,
        disableHostCheck: true,
        watchOptions: {
            poll: true
        }
    },
    pluginOptions: {
    }
}