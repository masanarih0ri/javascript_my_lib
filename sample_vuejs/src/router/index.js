import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hoge from '@/components/Hoge'

Vue.use(Router)

// '/'にアクセスした場合HelloWorldコンポーネントを出力する
// ここの配列にオブジェクトを追加していくと、ルーティングを追加していくことができる。

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld  //HelloWorldコンポーネントにアクセスしている
    },
    {
      path: '/hoge',
      name: 'Hoge',
      component: Hoge
    }
  ]
})
