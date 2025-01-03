<template>
  <el-card id="loginBody">

    <div class="title-text" id="title">登录管理界面</div>
    <div id="subtitle">
      <el-text size="large">管理员登录</el-text>
    </div>
    <div id="formContainer">
      <el-form id="form" :model="form" label-width="auto">
        <el-form-item class="formItem">
          <el-input v-model="form.email" :prefix-icon="Message" placeholder="邮箱"/>
        </el-form-item>
        <el-form-item  class="formItem">
          <el-input v-model="form.password" :prefix-icon="Lock" placeholder="密码" show-password/>
        </el-form-item>
        <el-form-item  class="formItem" v-if="isRegister">
          <el-input v-model="form.passwordConfirm" :prefix-icon="Lock" placeholder="重复密码" show-password/>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="info" link style="float: left">
          <el-text size="small" type="info">忘记密码</el-text>
        </el-button>
        <el-button type="info" link style="float: right" v-if="!isRegister" @click="isRegister=!isRegister">
          <el-text size="small" type="info">没有账号？注册</el-text>
        </el-button>
        <el-button type="info" link style="float: right" v-if="isRegister" @click="isRegister=!isRegister">
          <el-text size="small" type="info">已有账号？登录</el-text>
        </el-button>
      </div>
      <el-button class="formItem" type="primary" id="button" @click="register" :loading="loading">
        {{isRegister?"注册":"登录"}} &nbsp<el-icon><Right /></el-icon>
      </el-button>
    </div>
  </el-card>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage, ElForm, ElFormItem, ElInput, ElButton, ElCard, ElContainer } from 'element-plus';
import PocketBase from 'pocketbase'
import {Lock, Message, Right, UserFilled} from "@element-plus/icons-vue";
import {store} from "../store.ts";
import {useRouter} from "vue-router";
const isRegister = ref(false) //false为登录
const loading = ref(false)
const form = reactive({
  email: '',
  password: '',
  passwordConfirm: ''
})
const router = useRouter()

const registerOrLogin = ()=>{
  if (isRegister.value) register()
  else login()
}

const registerValidation = ()=>{
  if (form.password === ''){
    ElMessage.warning("密码不能为空")
    return false
  }else if(form.email === ''){
    ElMessage.warning("邮箱不能为空")
    return false
  }else if (form.password !== form.passwordConfirm){
    ElMessage.warning("两次密码不同")
    return false
  }
  return true
}
const register = async () => {
  if (registerValidation()) {
    const data = {
      "password": form.password,
      "passwordConfirm": form.passwordConfirm,
      "email": form.email,
      "emailVisibility": true,
    };
    store.tmp.form = form
    loading.value = true

    const record = await store.pb.collection('users').create(data);

// (optional) send an email verification request
    ElMessage.info("正在发送邮件")
    await store.pb.collection('users').requestVerification(form.email);

    await router.push('/registerValidation')
  }
}

const login = ()=>{
  if(store.methods.login()){
    router.push('/')
  }else{
    ElMessage.warning("用户名或密码错误")
  }
}

</script>

<style scoped>
#loginBody{
  width: 30%;
  height: 60%;
  margin: 10% auto auto;
}
#title{
  margin-top: 20%;

}

.text-icon{
  margin-top: 5px;
}

.title-text {
  margin-left: 10px; /* 图标与文本之间的间距 */
  font-size: 36px; /* 文本大小，可根据需要调整 */
  font-family: '华文行楷', serif;
  /* 可选：设置文本颜色、字体等 */
  /* color: #333; */
}
#subtitle{
  margin-top: 6%;
}
#form{
  width: 100%;
  margin: auto;
  margin-top: 5%;
}

#button{
  width: 100%;
}



#formContainer{
  width: 70%;
  margin: auto;
}
</style>
