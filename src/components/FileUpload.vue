<script setup lang="ts">
import {store} from "../store.ts";
import {ElMessage} from "element-plus";
import {UploadFilled} from "@element-plus/icons-vue";
const props = defineProps({
  datasource_id: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['success', 'error'])
let optionList = []
let isUploading = false

// 防止文件并发传输导致跨域出错
const handleChange = (option)=>{
  optionList.push(option)
  doUpload()
}
const doUpload = async()=>{
  if (isUploading || optionList.length === 0) return
  isUploading = true
  const option = optionList.pop()
  console.log("正在传文件: ", option.name)
  const data = {
    "data_source": props.datasource_id,
    "deleted": false,
    "file_name": option.name,
    "owner": store.pb.authStore.record?.id,
    "file": option.raw,
  }
  await store.pb.collection('data_file').create(data).then(()=>{
    ElMessage.success("上传文件成功")
    emit('success')
  }).catch(()=>{
    ElMessage.error("上传失败，请检查文件大小和文件格式是否符合要求")
    emit('error')
  })
  isUploading = false
  doUpload()
}
</script>

<template>
  <el-upload
      drag
      multiple
      :auto-upload="false"
      class="formItem"
      :on-change="handleChange"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        支持.pdf,.doc/docx,.txt，文件小于50MB
      </div>
    </template>
  </el-upload>
</template>

<style scoped>

</style>