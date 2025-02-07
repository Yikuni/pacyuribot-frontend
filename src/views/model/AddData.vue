<script setup lang="ts">

</script>

<template>
<div class="mainContent">
  <el-space :size="50" wrap>
    <router-link to="/main/model/datasourceCreate/upload">
      <el-card  style="width: 250px">
        <template #header>
          <el-image style="width: 128px; height: 128px" src="/images/upload.svg" />
        </template>
        <div>
          上传文档
        </div>
      </el-card>
    </router-link>
    <router-link to="/main/model/datasourceCreate/crawl">
      <el-card  style="width: 250px">
        <template #header>
          <el-image style="width: 128px; height: 128px" src="/images/Crawler.svg" />
        </template>
        <div>
          自动爬取
        </div>
      </el-card>
    </router-link>

  </el-space>
</div>
</template>

<style scoped>

</style>