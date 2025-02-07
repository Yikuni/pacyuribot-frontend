<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {store} from "../../store.ts";
import {onMounted, reactive, ref} from "vue";
import {View} from "@element-plus/icons-vue";
import {ElMessage, type TableInstance} from "element-plus";
import FileUpload from "../../components/FileUpload.vue";
const router = useRouter()
const id = useRoute().params.id
const datasource = reactive({data: {name: '', id: ''}})
const files = ref()
const multipleTableRef = ref<TableInstance>()
let preName = ''

onMounted(async ()=>{
  getFileTable()
  datasource.data = await store.pb.collection('data_source').getOne(id)
  preName = datasource.data.name

})

const getFileTable = async ()=>{
  files.value = await store.pb.collection("data_file").getFullList({
    sort: 'created', filter: `deleted=false && data_source='${id}'`
  })
}
const deleteSelectedFiles = ()=>{
  const select = multipleTableRef.value?.getSelectionRows()
  for (let fileObj of select) {
    fileObj.deleted = true
    store.pb.collection('data_file').update(fileObj.id, fileObj)
  }
  refresh("已删除所选记录")
}

const deleteDatasource = ()=>{
  const data = datasource.data
  data.deleted = true
  store.pb.collection("data_source").update(data.id, data)
  ElMessage.success("已删除所选数据源，正在跳转页面")
  setTimeout(()=>{
    router.push("/main/model/dataSource")
  }, 1000)
}
const refresh = (msg)=>{
  setTimeout(()=>{
    getFileTable()
    if(msg !== ''){
      ElMessage.success(msg)
    }

  }, 1000)
}
const rename = ()=>{
  const data = datasource.data
  if (preName === data.name) return
  store.pb.collection('data_source').update(data.id, data);
  preName = data.name
  ElMessage.success("修改名称为: " + preName)
}

</script>

<template>
  <div class="mainContent">
    <el-card id="box">
      <template #header>
        数据源编辑
      </template>
      <div id="form">
        <el-form-item label="名称" class="formItem">
          <el-input v-model="datasource.data.name" :prefix-icon="View" @blur="rename"/>
        </el-form-item>
        <FileUpload :datasource_id="datasource.data.id" class="formItem" @success="refresh('')"/>
          <el-table :data="files" stripe class="formItem" row-key="id" ref="multipleTableRef">
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" :index="(index) => {return index}"/>
            <el-table-column prop="file_name" label="文件名称" />
            <el-table-column prop="created" label="上传日期" />
          </el-table>
        <el-button type="primary" class="formItem" @click="deleteSelectedFiles">
          下载所选文件
        </el-button>
        <el-popconfirm title="确认要删除所选文件？" @confirm="deleteSelectedFiles">
          <template #reference>
            <el-button type="danger"  class="formItem">
              删除所选文件
            </el-button>
          </template>
        </el-popconfirm>
        <el-popconfirm title="确认要删除所选文件？" @confirm="deleteDatasource">
          <template #reference>
            <el-button type="danger"  class="formItem">
              删除该数据源
            </el-button>
          </template>
        </el-popconfirm>
      </div>
    </el-card>

  </div>
</template>

<style scoped>

</style>