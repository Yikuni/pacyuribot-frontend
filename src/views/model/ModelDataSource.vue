<script setup lang="ts">

</script>

<template>
  <div class="mainContent">
    <el-space :size="50" wrap>
      <el-card v-for="i in 11" :key="i" class="box-card" style="width: 250px">
        <template #header>
          <el-image style="width: 128px; height: 128px" src="/images/pdf.svg" />
        </template>
        <div class="text item">
          {{ 'pdfA '}}
        </div>
      </el-card>
      <router-link to="/main/model/addData">
        <el-card style="width: 250px">
          <template #header>
            <el-image style="width: 128px; height: 128px" src="/images/createModel.png" />
          </template>
          <div class="text item">
            新建数据源
          </div>
        </el-card>
      </router-link>
    </el-space>
  </div>
</template>

<style scoped>

</style>