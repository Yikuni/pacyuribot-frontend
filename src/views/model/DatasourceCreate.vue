<script setup lang="ts">
import {store} from "../../store.ts";
import {ElButton, ElMessage} from "element-plus";
import {useRoute, useRouter} from "vue-router";
import {onBeforeUnmount, onMounted, reactive, ref} from "vue";
import {View} from "@element-plus/icons-vue";
import FileUpload from "../../components/FileUpload.vue";
import CrawlTaskCreate from "../../components/CrawlTaskCreate.vue";


const router = useRouter()
const method = useRoute().params.method
const crawlTaskRef = ref()
const isUpload = method === "upload"
const datasourceID = ref("")
const data = reactive({
  crawl: false,
  model: store.modelInfo.id,
  deleted: true,
  owner: store.pb.authStore.record?.id,
  name: ""
});


const create = async ()=>{
  const record = await store.pb.collection('data_source').create(data)
  datasourceID.value = record.id
}

const activate = async ()=>{
  data.deleted = false
  if (isUpload){
    ElMessage.success("创建数据源成功")
  }else{
    data.crawl = true
    await crawlTaskRef.value.createCrawlTask()
    ElMessage.success("创建爬取数据任务成功")
  }
  await store.pb.collection('data_source').update(datasourceID.value, data);

  await router.push("/main/model/dataSource")
}

const clearUnactivatedDatasource = ()=>{
  if (data.deleted){
    store.pb.collection('data_source').delete(datasourceID.value)
  }
}

onMounted(()=>{
  create()
})
onBeforeUnmount(()=>{
  clearUnactivatedDatasource()
})
</script>

<template>
  <div class="mainContent">
    <el-card id="box">
      <template #header>
        {{isUpload?'上传数据源文件':'创建自动爬取数据任务'}}
      </template>
      <div id="form">
        <div  class="formItem">
          <el-input v-model="data.name" placeholder="数据源名称" :prefix-icon="View"/>
        </div>
        <FileUpload :datasource_id="datasourceID" v-if="isUpload"/>
        <CrawlTaskCreate :datasource_id="datasourceID" v-if="!isUpload" ref="crawlTaskRef"/>
        <el-button class="formItem"  type="primary" id="button" @click="activate">
          创建数据源
        </el-button>
      </div>

    </el-card>

  </div>
</template>

<style scoped>

</style>