var app = new Vue({
  el: '#app',
  data: {
    city: null,
    temp: null,
    condition: {
      main: null
    }
  },
  mounted: function() {
    // axios.get('https://api.openweathermap.org/data/2.5/weather?q=Tokyo,ja&appid=abcfb49869ddd26b2fd5b61452779c10')
    axios.get('https://api.openweathermap.org/data/2.5/weather?q=Tokyo,jp&appid=abcfb49869ddd26b2fd5b61452779c10')
    .then(function(response) {
      this.city = response.data.name
      this.temp = response.data.main.temp
      this.condition = response.data.weather[0]
    }.bind(this))
    .catch(function(error) {
      console.log(error)
    })
  },
  filters: {
    roundUp(value) {
      return Math.ceil(value - 273.15)
    }
  }
})