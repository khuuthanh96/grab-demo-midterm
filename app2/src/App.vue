<template>
  <div id="app">
    <b-container>

        <Navbar v-if="isLogin" v-bind:user="user" v-on:logout="setLogin"/>
        <Login v-if="!isLogin" v-on:login="setLogin" :getRefreshtoken="getRefreshtoken"/> 
        <Dashboard v-if="isLogin" :getRefreshtoken="getRefreshtoken" :setLogin="setLogin"/>

    </b-container>


    <ul class="bg-bubbles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import Dashboard from "./components/Dashboard.vue";
import Navbar from "./components/Navbar.vue";
import Login from "./components/Login.vue";
import config from "./lib/config.json";
const myConfig = config['dev'];

export default {
  name: "app",
  components: {
    Dashboard,
    Navbar,
    Login
  },
  data () {
    return {
      user: null,
      isLogin: false
    }
  },
  methods: {
    setLogin(user) {
      this.user = user || null;
      if(this.user) {
        this.isLogin = true;      
      }else {
        this.isLogin = false;
      }
    },
    async getRefreshtoken() {
      const self = this;
      await self.$http.post(`${myConfig.host}auth/refreshtoken`,{refreshToken: localStorage.refreshToken})
      .then(res => {
        localStorage.setItem('accessToken', res.data.accesstoken);
      })
      .catch(err => {
        if(err.response.status === 401) {
          self.isLogin = false
        }
      })
    }
  }
};
</script>

<style>
#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  color: white;
  font-family: 'Lato';
  position: fixed;
  width: 100%;
  height: 100%;
  background: -webkit-linear-gradient(left, #25c481, #25b7c4);
  background: linear-gradient(to right, #25c481, #25b7c4);
}

.active {
  display: block;
}
.none {
  display: none;
}

.bg-bubbles 
{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.bg-bubbles li 
{
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.15);
  bottom: -160px;
  -webkit-animation: square 25s infinite;
  animation: square 25s infinite;
  transition-timing-function: linear;
}
.bg-bubbles li:nth-child(1) 
{
  left: 10%;
}
.bg-bubbles li:nth-child(2) 
{
  left: 20%;
  width: 80px;
  height: 80px;
  -webkit-animation-delay: 2s;
          animation-delay: 2s;
  -webkit-animation-duration: 17s;
          animation-duration: 17s;
}
.bg-bubbles li:nth-child(3) 
{
  left: 25%;
  -webkit-animation-delay: 4s;
          animation-delay: 4s;
}
.bg-bubbles li:nth-child(4) 
{
  left: 40%;
  width: 60px;
  height: 60px;
  -webkit-animation-duration: 22s;
          animation-duration: 22s;
  background-color: rgba(255, 255, 255, 0.25);
}
.bg-bubbles li:nth-child(5) 
{
  left: 70%;
}
.bg-bubbles li:nth-child(6) 
{
  left: 80%;
  width: 120px;
  height: 120px;
  -webkit-animation-delay: 3s;
          animation-delay: 3s;
  background-color: rgba(255, 255, 255, 0.2);
}
.bg-bubbles li:nth-child(7) 
{
  left: 32%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 7s;
          animation-delay: 7s;
}
.bg-bubbles li:nth-child(8) 
{
  left: 55%;
  width: 20px;
  height: 20px;
  -webkit-animation-delay: 15s;
          animation-delay: 15s;
  -webkit-animation-duration: 40s;
          animation-duration: 40s;
}
.bg-bubbles li:nth-child(9) 
{
  left: 25%;
  width: 10px;
  height: 10px;
  -webkit-animation-delay: 2s;
          animation-delay: 2s;
  -webkit-animation-duration: 40s;
          animation-duration: 40s;
  background-color: rgba(255, 255, 255, 0.3);
}
.bg-bubbles li:nth-child(10) 
{
  left: 90%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 11s;
          animation-delay: 11s;
}
@-webkit-keyframes square 
{
  0% 
  {
      -webkit-transform: translateY(0);
              transform: translateY(0);
  }
  100% 
  {
      -webkit-transform: translateY(-700px) rotate(600deg);
              transform: translateY(-700px) rotate(600deg);
  }
}
@keyframes square 
{
  0% 
  {
      -webkit-transform: translateY(0);
              transform: translateY(0);
  }
  100% 
  {
      -webkit-transform: translateY(-700px) rotate(600deg);
              transform: translateY(-700px) rotate(600deg);
  }
}

@font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjxAwXjeu.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
  /* latin */

@font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wXg.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

</style>
