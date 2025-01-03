<script setup lang="ts">
import {store} from "../store.ts";
import {ElButton, ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const router = useRouter()

const validationComplete = async()=>{
  if(await store.methods.login(store.tmp.form.email, store.tmp.form.password)){
    await router.push("/")
  }else{
    ElMessage.warning("似乎没有正确激活，请稍后再试")
  }
}
</script>

<template>
  <el-card id="box">
    <div id="boxContent">
      <div id="text">
        <el-text size="large">
          激活邮件已发送至<mark>{{store.tmp.form.email}}</mark>，请检查邮箱并激活
        </el-text>
      </div>
      <el-button type="primary" id="button" @click="validationComplete">
        已经激活？点击跳转
      </el-button>
    </div>
  </el-card>
</template>

<style scoped>
#box{
  width: 60%;
  height: 25%;
  margin: 10% auto auto;
}
#button{
  margin-top: 5%;
  width: 100%;
}
#text{
  margin-top: 5%;
}
#boxContent{
  width: 60%;
  margin: auto;

}
</style>