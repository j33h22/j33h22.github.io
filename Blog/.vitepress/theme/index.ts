// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
import './custom.css'
import layout from './layout.vue'; 

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

// 组件
import Player from '../../components/Player.vue'; 
import Walineinit from '../../components/Walineinit.vue'; 

export default {
  extends: Theme,
  Layout: layout,
  enhanceApp({ app, router, siteData }) {
    // ...
    app.use(Antd);
    app.component('Player', Player)
    app.component('Walineinit', Walineinit)
  }
}
