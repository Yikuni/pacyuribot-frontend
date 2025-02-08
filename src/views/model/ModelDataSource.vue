<script setup lang="ts">
import {store} from "../../store.ts";
import {onMounted, reactive} from "vue";

const dataSourceList = reactive({
  items: [

  ]
})

const gotoModelInfo = (id: string)=>{

}
onMounted(async()=>{
  dataSourceList.items = await store.pb.collection('data_source').getFullList({
    sort: 'created', filter: 'deleted = false'
  });
})
</script>

<template>
  <div class="mainContent">
    <el-space :size="50" wrap>
      <div v-for="dataSource in dataSourceList.items" :key="dataSource.id">
        <router-link :to="`/main/model/${dataSource.crawl?'crawlTask':'info'}/${dataSource.id}`">
          <el-card
              class="box-card"
              style="width: 250px"
              @click="gotoModelInfo(dataSource.id)"
          >
            <template #header>
              <el-image style="width: 128px; height: 128px" src="/images/pdf.svg" />
            </template>
            <div class="text item">
              {{ dataSource.name}}
            </div>
          </el-card>
        </router-link>
      </div>
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