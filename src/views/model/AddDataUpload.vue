<script setup lang="ts">
import {store} from "../../store.ts";
import {ElButton, ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import {View} from "@element-plus/icons-vue";
import FileUpload from "../../components/FileUpload.vue";


const router = useRouter()
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
  await store.pb.collection('data_source').update(datasourceID.value, data);
  await router.push("/main/model/dataSource")
}

onMounted(()=>{
  create()
})
</script>

<template>
  <div class="mainContent">
    <el-card id="box">
      <template #header>
        上传数据源文件
      </template>
      <div id="form">
        <div  class="formItem">
          <el-input v-model="data.name" style="width: 240px" placeholder="数据源名称" :prefix-icon="View"/>
        </div>
        <FileUpload :datasource_id="datasourceID" />
        <el-button class="formItem"  type="primary" id="button" @click="activate">
          创建数据源
        </el-button>
      </div>

    </el-card>

  </div>
</template>

<style scoped>

</style>