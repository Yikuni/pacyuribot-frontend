<script setup lang="ts">

import {ElContainer} from "element-plus";
import AsideMenu from "../components/AsideMenu.vue";
import {onMounted} from "vue";
import {store} from "../store.ts";
import {useRouter} from "vue-router";

const router = useRouter()
onMounted(()=>{
  if(store.pb.authStore.isValid){
    console.log("已登录")
  }else{
    router.push('/login')
  }
})
</script>

<template>
  <div id="app">
    <el-container>
        <AsideMenu />
      <el-main>
          <router-view />
      </el-main>

    </el-container>
  </div>
</template>

<style scoped>

</style>