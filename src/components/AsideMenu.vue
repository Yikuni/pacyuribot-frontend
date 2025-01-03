<script setup lang="ts">

import {ElMenu, ElMenuItem} from "element-plus";
import { ref } from 'vue'
import {DArrowRight} from "@element-plus/icons-vue";
import {store} from "../store.ts";

const buttonLeft = ref("70px")

const handleExpand = ()=>{
  if (isCollapse.value) buttonLeft.value="140px"
  else buttonLeft.value="70px"
  isCollapse.value = !isCollapse.value
}
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
<div id="aside">
  <img
      style="width: 36px"
      src="/images/logo.png"
      alt="Element logo"
      id="logo"
  />
  <el-button
      size="small"
      :icon="isCollapse?'DArrowRight':'DArrowLeft'"
      circle id="expandButton"
      @click="handleExpand"
      :style="{left: buttonLeft}"
  />
  <el-menu
      default-active="1"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      :router="true"
  >

    <el-menu-item index="/main/models">
      <el-icon size="large"><Collection /></el-icon>
      <template #title>模型</template>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon size="large"><Filter /></el-icon>
      <template #title>过滤器</template>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon size="large"><Guide /></el-icon>
      <template #title>流程</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon size="large"><document /></el-icon>
      <template #title>帮助文档</template>
    </el-menu-item>
    <el-menu-item index="5">
      <el-icon size="large"><setting /></el-icon>
      <template #title>设置</template>
    </el-menu-item>
    <el-sub-menu index="6" id="userMenu">
      <template #title>
        <el-icon size="large"><Avatar /></el-icon>
        <span>用户A</span>
      </template>
      <el-menu-item-group>
        <template #title><span>{{ store.pb.authStore.record.email }}</span></template>
        <el-menu-item index="6-1">用户中心</el-menu-item>
        <el-menu-item index="6-2">登出</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>

</div>
</template>

<style scoped>
#aside{
  height: 100%;
  border-right: 1px solid #ccc; /* 设置右边框为1px灰色 */
  padding-right: 25px; /* 可选：为内容添加右侧内边距，避免内容紧贴边框 */
  background-color: #ffffff;
}




#logo{
  margin-left: 20px;
  margin-top: 30px;
  margin-bottom: 20px;
}

#expandButton{
  position: absolute;
  float: right;
  top: 40px;
  transition: left 1s ease;
  z-index: 1000;
}
#userMenu{
  position: absolute;
  bottom: 10%;
}
</style>