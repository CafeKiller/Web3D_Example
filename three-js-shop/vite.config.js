import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from "unplugin-vue-components/vite";
import {AntDesignVueResolver} from "unplugin-vue-components/resolvers";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    server:{
      open:true,
      port:3000,
    },
    resolve:{
        alias:{
          "@":path.resolve(__dirname,'src')
        }
    },
    plugins: [
        vue(),
            Components({
            // 自动组件加载
            resolvers:[AntDesignVueResolver()]
        })
    ],
})
