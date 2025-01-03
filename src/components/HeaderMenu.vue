<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0">
      <img
          style="width: 36px"
          src="/images/logo.png"
          alt="Element logo"
      />
    </el-menu-item>
    <el-menu-item index="1">主页</el-menu-item>

    <el-menu-item index="2"><RouterLink to="/login">登录 / 注册</RouterLink></el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {ElMenu, ElMenuItem, ElSubMenu} from "element-plus";

const activeIndex = ref('')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
