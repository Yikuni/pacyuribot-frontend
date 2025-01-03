<script setup lang="ts">
import {store} from "../store.ts";
import {onMounted, reactive} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
const models = reactive({
  items: [
    {
      name: '',
      id: '',
    }
  ]
})

const gotoModelInfo = (model)=>{
  store.modelInfo = model
  router.push('/main/model/dataSource')
}
onMounted(async()=>{
  const record = await store.pb.collection('models').getFullList({
    sort: 'created'
  })
  console.log('record', record)
  models.items = record
})
</script>

<template>
  <div class="mainContent">
    <el-space :size="50" wrap>
      <el-card
          v-for="model in models.items"
          :key="model.id"
          class="box-card"
          style="width: 250px"
          @click="gotoModelInfo(model)"
      >
        <template #header>
          <el-image style="width: 128px; height: 128px" src="/images/book.png" />
        </template>
        <div class="text item">
          {{ model.name}}
        </div>
      </el-card>
      <router-link to="/main/createModel">
        <el-card style="width: 250px">
          <template #header>
            <el-image style="width: 128px; height: 128px" src="/images/createModel.png" />
          </template>
          <div class="text item">
            新建知识库
          </div>
        </el-card>
      </router-link>

    </el-space>
  </div>
</template>

<style scoped>

</style>