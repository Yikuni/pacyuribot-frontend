<script setup lang="ts">
import {reactive, ref} from "vue";
import {store} from "../store.ts";
import {InfoFilled, Message, Right} from "@element-plus/icons-vue";
import {ElButton, ElFormItem, ElInput} from "element-plus";
import {useRouter} from "vue-router";

const router = useRouter()
const createModelForm = reactive({
  name: '',
  description: '',
  deleted: false,
  owner: store.pb.authStore.record.id
})
const loading = ref(false)


const createModel = async ()=>{
  loading.value = ref(true)
  store.modelInfo = await store.pb.collection('models').create(createModelForm)
  loading.value = ref(false)

  await router.push("/main/model/dataSource")
}
</script>

<template>
<div class="mainContent">
  <el-card id="box">
    <template #header>
      创建模型界面
    </template>
    <div>
      <el-form id="form">
        <el-form-item class="formItem">
          <el-input v-model="createModelForm.name" :prefix-icon="Message" placeholder="模型名称"/>
        </el-form-item>
        <el-form-item  class="formItem">
          <el-input
              v-model="createModelForm.description"
              :prefix-icon="InfoFilled"
              placeholder="模型简介"
              type="textarea"
              :rows="4"
          />
        </el-form-item>
        <el-button class="formItem" type="primary" id="button" @click="createModel" :loading="loading">
          立即创建 &nbsp<el-icon><Right /></el-icon>
        </el-button>
      </el-form>
    </div>
  </el-card>
</div>
</template>

<style scoped>
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