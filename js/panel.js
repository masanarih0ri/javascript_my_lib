new Vue({
  el: '#app',
  data: {
    show: true
  },
  computed: {
    label: function(){
      return this.show ? "閉じる" : "開く"
    }
  }
})