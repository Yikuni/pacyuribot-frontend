<script setup lang="ts">
import {onBeforeMount, reactive, ref} from "vue";
import {store} from "../../store.ts";
import {useRoute} from "vue-router";
import {Edit, View} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

let preName = ''
const id = useRoute().params.id

const datasource = reactive({data: {name: '', id: '', deleted: false}})
const configData = reactive({data: {config: {
      title_filter: false,
      max_length_c: 8,
      max_length_e: 15,
      min_page_content_length: 30,
      allow_origins: [],
      dis_allow_origins: [],
      target_urls: [],
      max_depth: 1,
      allow_external_link: true,
    },
    completed: false,
    data_amount: 5,
  }})
const crawlData = reactive({data: {items: [{id: '123', target_url: "123"},], totalItems: 2}})
const crawlDataTableRef = ref()
const rename = ()=>{
  const data = datasource.data
  if (preName === data.name) return
  store.pb.collection('data_source').update(data.id, data);
  preName = data.name
  ElMessage.success("修改名称为: " + preName)
}
const getCrawlData = async (page)=>{
  const end = page * 10
  const crawlDataObj = await store.pb.collection('crawl_data').getList(end-9, end, {filter: `data_source='${id}'`})
  for(let item of crawlDataObj.items){
    item.target_url = decodeURIComponent(item.target_url)
  }
  crawlData.data = crawlDataObj
}
onBeforeMount(async ()=>{
  datasource.data = await store.pb.collection('data_source').getOne(id)
  configData.data = await store.pb.collection('crawl_task').getFirstListItem(`data_source="${datasource.data.id}"`)
  preName = datasource.data.name
  await getCrawlData(1)
})
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
      <el-collapse accordion>
        <el-collapse-item title="配置信息">
          <el-descriptions>
            <el-descriptions-item label="标题过滤器">
              {{configData.data.config.title_filter?"启用":"禁用"}}
            </el-descriptions-item>
            <el-descriptions-item label="最长中文标题" v-if="configData.data.config.title_filter">
              {{configData.data.config.max_length_c}}
            </el-descriptions-item>
            <el-descriptions-item label="最长英文标题" v-if="configData.data.config.title_filter">
              {{configData.data.config.max_length_e}}
            </el-descriptions-item>
            <el-descriptions-item label="最短内容长度">
              {{configData.data.config.min_page_content_length}}
            </el-descriptions-item>
            <el-descriptions-item label="目标url">
              {{configData.data.config.target_urls}}
            </el-descriptions-item>
            <el-descriptions-item label="允许的域名">
              {{configData.data.config.allow_origins}}
            </el-descriptions-item>
            <el-descriptions-item label="禁止的域名">
              {{configData.data.config.dis_allow_origins}}
            </el-descriptions-item>
            <el-descriptions-item label="最大深度">
              {{configData.data.config.max_depth}}
            </el-descriptions-item>
            <el-descriptions-item label="允许一次外链">
              {{configData.data.config.allow_external_link}}
            </el-descriptions-item>
          </el-descriptions>
        </el-collapse-item>
        <el-collapse-item title="已爬取的页面">
          <el-table :data="crawlData.data.items" stripe  row-key="id" ref="crawlDataTableRef">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="target_url" label="目标url"/>
            <el-table-column label="操作">
              <template #default>
                  <el-button :icon="Edit" circle />
              </template>
            </el-table-column>
          </el-table>
          <el-pagination layout="prev, pager, next" :total="crawlData.data.totalItems" />
          <!-- TODO 完成具体功能-->
          <el-button type="danger">删除所选</el-button>
          <el-button type="primary">下载所选</el-button>
          <el-button type="primary">下载全部{{crawlData.data.totalItems}}个文件</el-button>

        </el-collapse-item>
      </el-collapse>
    </div>
  </el-card>
</div>
</template>

<style scoped>


</style>