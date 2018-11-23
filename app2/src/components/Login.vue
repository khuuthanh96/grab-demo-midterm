<template>
<div id="Login">
    <div id="container_signin">
        <h1 class="title_signin">Sign In</h1>
        
        <form class="form">
            <span><font-awesome-icon icon="user" /></span>
            <input type="email" placeholder="User Name" v-model="email" />
            <span><font-awesome-icon icon="unlock-alt" /></span>
            <input type="password" placeholder="Password" v-model="password" />
            <button type="button" @click="login" id="signin-button">Sign In</button>
        </form>

         <b-alert :show="isError" dismissible variant="danger">{{err}}</b-alert>
    </div>
</div>
</template>

<script>
import axios from "axios";
import config from "../lib/config.json";
const myConfig = config['dev'];

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      err: '',
      isError: false
    }
  },
  methods: {
    login () {
        axios.post(myConfig.host + "auth/login", {email: this.email, password: this.password})
        .then(res => {
            localStorage.accessToken = res.data.accessToken;
            localStorage.refreshToken = res.data.refreshToken;
            this.$emit('login', res.data.user);
        })
        .catch(err => {
            this.err = err.response.data.message.message;
            this.isError = true;
        });
    }
  }
}
</script>

<style scoped>
#container_signin 
{
    z-index: 7;
    position: absolute;
    left: 0;
    right: 0;
    margin: 28vh auto 0 auto;
    height: 200px;
    text-align: center;
    /* background-color: #000; */
}
h1 .title_signin 
{
    /* display: none; */
    font-size: 40px;
    transition-duration: 0.5s;
    transition-timing-function: ease-in-put;
    font-weight: 400;
}
form 
{
    /* display: none; */
    padding: 20px 0;
    position: relative;
    z-index: 2;
}
form input 
{
    -webkit-appearance: none;
        -moz-appearance: none;
            appearance: none;
    outline: 0;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.2);
    width: 250px;
    border-radius: 3px;
    padding: 10px 15px;
    margin: 0 auto 10px auto;
    display: block;
    text-align: center;
    font-size: 18px;
    color: white;
    transition-duration: 0.25s;
    font-weight: 400;
}
form input:hover 
{
    background-color: rgba(255, 255, 255, 0.4); 
}
form input:focus 
{
    background-color: white;
    width: 300px;
    color: #53e3a6;
}
form span
{
  z-index: -1;
  position: absolute;
  left: calc(50% - 122.5px);
  width: 40px;
  height: 40px;
  margin-top: 2.5px;
  padding: 10px 0 0 0.5px;
  text-align: center;
  font-size: 20px;
  background-color: rgba(255, 255, 255, 0.4); 
  border-radius: 3px;
}
form button 
{
    -webkit-appearance: none;
        -moz-appearance: none;
            appearance: none;
    outline: 0;
    background-color: white;
    border: 0;
    padding: 10px 15px;
    color: #53e3a6;
    border-radius: 3px;
    width: 250px;
    cursor: pointer;
    font-size: 18px;
    transition-duration: 0.25s;
}
form button:hover 
{
    background-color: #f5f7f9;
}

.content 
{
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
    height: 160px;
    overflow: hidden;
    font-family: 'Lato', sans-serif;
    font-size: 35px;
    line-height: 40px;
    color: #ecf0f1;
}
.content__container 
{
    font-weight: 600;
    overflow: hidden;
    height: 40px;
    padding: 0 40px;
}
.content__container:before 
{
    content: '[';
    left: 0;
}
.content__container:after 
{
    content: ']';
    position: absolute;
    right: 0;
}
.content__container:after, .content__container:before 
{
    position: absolute;
    top: 0;
    color: #16a085;
    font-size: 42px;
    line-height: 40px;
    -webkit-animation-name: opacity;
    -webkit-animation-duration: 2s;
    -webkit-animation-iteration-count: infinite;
    animation-name: opacity;
    animation-duration: 2s;
    animation-iteration-count: infinite;
}
.content__container__text 
{
    display: inline;
    float: left;
    margin: 0;
}
.content__container__list 
{
    margin-top: 0;
    padding-left: 110px;
    text-align: left;
    list-style: none;
    -webkit-animation-name: change;
    -webkit-animation-duration: 10s;
    -webkit-animation-iteration-count: infinite;
    animation-name: change;
    animation-duration: 10s;
    animation-iteration-count: infinite;
}
.content__container__list__item 
{
    line-height: 40px;
    margin: 0;
}


@-webkit-keyframes opacity 
{
    0%, 100% 
    {
        opacity: 0;
    }
    50% 
    {
        opacity: 1;
    }
}
@-webkit-keyframes change 
{
    0%, 12.66%, 100% 
    {
        -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
    }
    16.66%, 29.32% 
    {
        -webkit-transform: translate3d(0, -25%, 0);
                transform: translate3d(0, -25%, 0);
    }
    33.32%,45.98% 
    {
        -webkit-transform: translate3d(0, -50%, 0);
                transform: translate3d(0, -50%, 0);
    }
    49.98%,62.64% 
    {
        -webkit-transform: translate3d(0, -75%, 0);
                transform: translate3d(0, -75%, 0);
    }
    66.64%,79.3% 
    {
        -webkit-transform: translate3d(0, -50%, 0);
                transform: translate3d(0, -50%, 0);
    }
    83.3%,95.96% 
    {
        -webkit-transform: translate3d(0, -25%, 0);
                transform: translate3d(0, -25%, 0);
    }
}
@keyframes opacity 
{
    0%, 100% 
    {
        opacity: 0;
    }
    50% 
    {
        opacity: 1;
    }
}
@keyframes change 
{
    0%, 12.66%, 100% 
    {
        -webkit-transform: translate3d(0, 0, 0);
                transform: translate3d(0, 0, 0);
    }
    16.66%, 29.32% 
    {
        -webkit-transform: translate3d(0, -25%, 0);
                transform: translate3d(0, -25%, 0);
    }
    33.32%,45.98% 
    {
        -webkit-transform: translate3d(0, -50%, 0);
                transform: translate3d(0, -50%, 0);
    }
    49.98%,62.64% 
    {
        -webkit-transform: translate3d(0, -75%, 0);
                transform: translate3d(0, -75%, 0);
    }
    66.64%,79.3% 
    {
        -webkit-transform: translate3d(0, -50%, 0);
                transform: translate3d(0, -50%, 0);
    }
    83.3%,95.96% 
    {
        -webkit-transform: translate3d(0, -25%, 0);
                transform: translate3d(0, -25%, 0);
    }
}

.btn-signin
{
    display: none;
    width: 160px;
    left: 0;
    right: 0;
    margin: 135px auto 0 auto;
    padding: 0 0 6px 0;
    font-family: 'Lato';
    color: #fff;
    background-color: rgba(255, 255, 255, 0.2);
    border: 5px solid rgba(255, 255, 255, 0.4);
    border-radius: 3px;

    /* cursor: pointer; */
}
.btn-signin:hover
{
    background-color: rgba(255, 255, 255, 0.4);
    border: 5px solid rgba(255, 255, 255, 0.6);
    -webkit-box-shadow: 0px 0px 16px 0px rgba(255,255,255,0.65);
    -moz-box-shadow: 0px 0px 16px 0px rgba(255,255,255,0.65);
    box-shadow: 0px 0px 16px 0px rgba(255,255,255,0.65);
}

.container_signin 
{
    z-index: 7;
    position: absolute;
    left: 0;
    right: 0;
    margin: 28vh auto 0 auto;
    height: 200px;
    text-align: center;
    /* background-color: #000; */
}
h1.title_signin 
{
    /* display: none; */
    font-size: 40px;
    transition-duration: 0.5s;
    transition-timing-function: ease-in-put;
    font-weight: 400;
}
form 
{
    /* display: none; */
    padding: 20px 0;
    position: relative;
    z-index: 2;
}
form input 
{
    -webkit-appearance: none;
        -moz-appearance: none;
            appearance: none;
    outline: 0;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.2);
    width: 250px;
    border-radius: 3px;
    padding: 10px 15px;
    margin: 0 auto 10px auto;
    display: block;
    text-align: center;
    font-size: 18px;
    color: white;
    transition-duration: 0.25s;
    font-weight: 400;
}
form input:hover 
{
    background-color: rgba(255, 255, 255, 0.4); 
}
form input:focus 
{
    background-color: white;
    width: 300px;
    color: #53e3a6;
}
form span
{
  z-index: -1;
  position: absolute;
  left: calc(50% - 122.5px);
  width: 40px;
  height: 40px;
  margin-top: 2.5px;
  padding: 10px 0 0 0.5px;
  text-align: center;
  font-size: 20px;
  background-color: rgba(255, 255, 255, 0.4); 
  border-radius: 3px;
}
form button 
{
    -webkit-appearance: none;
        -moz-appearance: none;
            appearance: none;
    outline: 0;
    background-color: white;
    border: 0;
    padding: 10px 15px;
    color: #53e3a6;
    border-radius: 3px;
    width: 250px;
    cursor: pointer;
    font-size: 18px;
    transition-duration: 0.25s;
}
form button:hover 
{
    background-color: #f5f7f9;
}

.active {
  display: block;
}
</style>
