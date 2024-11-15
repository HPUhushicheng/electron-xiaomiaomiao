<template>
    <div class="container">


        <div class="first"><h1>电开</h1></div>
        <div class="second">
            <input placeholder="请输入你的手机号" pattern="\d+" class="tel" name="tel" type="tel" >
            <input placeholder="请输入你的密码" pattern="\d+" class="passwd" name="passwd" type="passwd">

            <button type="submit">登录</button>
            <p>还没有账号？<a href="#" @click.prevent="register">去注册</a></p>
        </div>
     
    </div>
</template>

<script setup>
import { ref } from 'vue'

const phoneNumber = ref('')
const password = ref('')
const rememberMe = ref(false)

const handleSubmit = () => {
    // Handle login logic here
    console.log('Login submitted', { phoneNumber: phoneNumber.value, password: password.value, rememberMe: rememberMe.value })
}
</script>

<style scoped>

.container {  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "first second";
}

.first { grid-area: first; }

.second { grid-area: second; }


button {
    font-size: 17px;
    padding: 0.5em 7em; /*5em修改长度*/
    border: transparent;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    background: dodgerblue;
    color: white;
    border-radius: 10px;/*修改圆角*/
    position:relative;
    left:300px;
}

button:hover {
    background: rgb(2, 0, 36);
    background: linear-gradient(90deg, rgba(30, 144, 255, 1) 0%, rgba(0, 212, 255, 1) 100%);
}

button:active {
    transform: translate(0em, 0.2em);
}


/* From Uiverse.io by Creatlydev */
.tel {
    width: 220px;
    padding: 12px;
    border: none;
    border-radius: 10px;
    box-shadow: 2px 2px 7px 0 rgb(0, 0, 0, 0.2);
    outline: none;
    color: dimgray;
    position: relative; /* 设置相对定位 */
    bottom: 150px;
    left:420px;
}

.tel:invalid {
    animation: justshake 0.3s forwards;
    color: rgb(89, 102, 80);
}

.passwd {
    width: 220px;
    padding: 12px;
    border: none;
    border-radius: 10px;
    box-shadow: 2px 2px 7px 0 rgb(0, 0, 0, 0.2);
    outline: none;
    color: dimgray;
    position: relative; /* 设置相对定位 */
    bottom: 80px;
    left:176px;
}

.passwd:invalid {
    animation: justshake 0.3s forwards;
    color: rgb(89, 102, 80);
}
@keyframes justshake {
    25% {
        transform: rotate(5deg);
    }

    50% {
        transform: rotate(-5deg);
    }

    75% {
        transform: rotate(5deg);
    }
}
</style>