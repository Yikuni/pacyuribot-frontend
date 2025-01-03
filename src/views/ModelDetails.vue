<script setup lang="ts">

import AsideMenu from "../components/AsideMenu.vue";
import {ElContainer} from "element-plus";
import ModelDetailsMenu from "../components/ModelDetailsMenu.vue";
</script>

<template>
  <div id="app">
    <el-container>
<ModelDetailsMenu />
      <el-main>
        <router-view />
      </el-main>

    </el-container>
  </div>
</template>

<style scoped>

</style>