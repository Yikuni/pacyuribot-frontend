<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting, Box, ChatLineRound, MessageBox, View,
} from '@element-plus/icons-vue'
import {ElMenu, ElMenuItem} from "element-plus";
import {onBeforeMount} from "vue";
import {useRouter} from "vue-router";
import {store} from "../store.ts";
const router = useRouter()
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

onBeforeMount(()=>{
  if (store.modelInfo === {}){
    router.push("/main/models")
  }
})
</script>

<template>
  <div id="aside2">
    <el-menu
        default-active="/main/model/dataSource"
        class="el-menu-vertical-demo"
        :router="true"
        @open="handleOpen"
        @close="handleClose"
        id="menuBody"
    >
      <el-menu-item index="/main/model/basicInfo">
        <el-icon><icon-menu /></el-icon>
        <span>基本信息</span>
      </el-menu-item>
      <el-menu-item index="/main/model/dataSource">
        <el-icon><Box /></el-icon>
        <span>数据源</span>
      </el-menu-item>
      <el-menu-item index="/main/model/chatbotPreview">
        <el-icon><ChatLineRound /></el-icon>
        <span>试用聊天机器人</span>
      </el-menu-item>
      <el-menu-item index="/main/model/chatHistory">
        <el-icon><MessageBox /></el-icon>
        <span>聊天记录</span>
      </el-menu-item>
      <el-menu-item index="/main/model/editAppearance">
        <el-icon><View /></el-icon>
        <span>编辑样式</span>
      </el-menu-item>
      <el-menu-item index="/main/model/addToSite">
        <el-icon><Link /></el-icon>
        <span>添加到网站</span>
      </el-menu-item>
      <el-menu-item index="/main/model/settings">
        <el-icon><setting /></el-icon>
        <span>设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
#aside2{
  height: 100%;
  border-right: 1px solid #ccc; /* 设置右边框为1px灰色 */
  padding-right: 25px; /* 可选：为内容添加右侧内边距，避免内容紧贴边框 */
  background-color: #ffffff;
  width: 200px;
}
#menuBody{
  margin-top: 30px;
}
</style>