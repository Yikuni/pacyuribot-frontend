<script setup lang="ts">

</script>

<template>
  <router-view />
</template>

<style>
html,body,#app,.el-container{
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0;
  /*外部间距也是如此设置*/
  margin: 0;
  /*统一设置高度为100%*/
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  height: 100%;
  width: 100%;
  max-width: 100%;
  background-color: #eaeaea;
  overflow: hidden;

}
.el-menu{
  border:0!important;
  height: 100%;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.el-header, .el-main, .el-menu{
  width: 100%;
  padding: 0 !important;
}

.el-main{
  background-color: #eaeaea;
}

.router-link-active {
  text-decoration: none;
  color: orange;
}

.mainContent{
  margin: 100px;
}
.formItem{
  margin-top: 20px;
}

#box{

  margin: auto;
  max-width: 600px;
}

#form{
  margin: 30px;
}

#button{
  width: 100%;
}
</style>
