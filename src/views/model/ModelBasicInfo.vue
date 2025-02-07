<script setup lang="ts">
import {ref} from "vue";
import {store} from "../../store.ts";
import {InfoFilled, Message, Right} from "@element-plus/icons-vue";
import {ElButton, ElFormItem, ElInput, ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const router = useRouter()
const loading = ref(false)


const modifyModelInfo = async ()=>{
  loading.value = true
  store.modelInfo = await store.pb.collection('models').update(store.modelInfo.id, store.modelInfo)
  loading.value = false
  ElMessage.success("修改成功")
}
</script>

<template>
  <div class="mainContent">
    <el-card id="box">
      <template #header>
        基本信息
      </template>
      <div>
        <el-form id="form">
          <el-form-item class="formItem">
            <el-input v-model="store.modelInfo.name" :prefix-icon="Message" placeholder="模型名称"/>
          </el-form-item>
          <el-form-item  class="formItem">
            <el-input
                v-model="store.modelInfo.description"
                :prefix-icon="InfoFilled"
                placeholder="模型简介"
                type="textarea"
                :rows="4"
            />
          </el-form-item>
          <el-button class="formItem" type="primary" id="button" @click="modifyModelInfo" :loading="loading">
            修改 &nbsp<el-icon><Right /></el-icon>
          </el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<style scoped>

</style>