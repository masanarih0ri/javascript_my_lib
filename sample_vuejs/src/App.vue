<!-- aaa.vueはvueコンポーネントを記述するもの -->
<!-- vue^loaderというものでブラウザが読み込める形へコンパイルされる -->
<!-- このファイルでAppコンポーネントを記述している -->

<template>
  <div id="app">
    <Header v-if="isHeaderShow" />
    <div class="container" v-if="isSearchShow">
      <h1 class="site-title">Qiita 検索アプリ</h1>
      <p class="site-description">Qiitaの記事一覧を表示するサービスです。</p>
      <input class="keyword" type="text" placeholder="検索したいキーワードを入れてください" v-model="newKeyword" @keyup.enter="search()">
    </div>
    <section v-if="isListShow">
      <div class="list-container">
        <p class="list__result">『<span class="result-keyword">keyword</span>』の検索結果一覧</p>
        <div class="list-container__item">
          <ul>
            <!-- v-forで検索して返ってきた分表示するようにする -->
            <li v-for="article in articles" class="article-item">
              <!-- urlという文字列を入れないと動かない -->
              <a :href="url" target="_blank"> title </a>
              <p class="user-name">by:user</p>
            </li>
          </ul>
          <p @click="reSearch" class="retry">トップへ戻る</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "./components/header";

export default {
  name: "app",
  data() {
    return {
      newKeyword: "",
      isSearchShow: true,
      isHeaderShow: false,
      isListShow :false
    };
  },

  components: {
    Header
  },

  // 各イベント発火時の処理を書く
  methods: {
    search() {
      this.isSearchShow = false;
      this.isHeaderShow = true;
      this.isListShow = true;
    },

    reSearch: function() {
      this.isHeaderShow = false;
      this.isListShow = false;
      this.isSearchShow = true;
      newKeyword = "";
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
