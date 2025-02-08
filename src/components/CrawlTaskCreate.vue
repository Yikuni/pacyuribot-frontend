<script setup lang="ts">

import {reactive, ref} from "vue";
import {store} from "../store.ts";
import type {CrawlTaskRecord} from "../model/crawl.ts";

const props = defineProps({
  datasource_id: {
    type: String,
    required: true
  }
})

const crawlTaskRecord: CrawlTaskRecord = reactive({
  owner: store.pb.authStore.record?.id,
  completed: false,
  data_source: props.datasource_id,
  crawl: true,
  deleted: false,
  config: {
    title_filter: true,
    max_length_c: 8,
    max_length_e: 15,
    min_page_content_length: 30,
    allow_origins: [],
    dis_allow_origins: [],
    target_urls: [],
    max_depth: 1,
    allow_external_link: true,
  }
})
const targetOriginStr = ref('')
const allowOriginStr = ref('')
const disallowOriginStr = ref('')
const updateTargetOrigin = ()=>{
  crawlTaskRecord.config.target_urls = targetOriginStr.value.split(',')
}
const updateDisallowOrigin = ()=>{
  crawlTaskRecord.config.dis_allow_origins = disallowOriginStr.value.split(',')
}
const updateAllowOrigin = ()=>{
  crawlTaskRecord.config.allow_origins = allowOriginStr.value.split(',')
}
const createCrawlTask = async ()=> {
  crawlTaskRecord.data_source = props.datasource_id
  await store.pb.collection('crawl_task').create(crawlTaskRecord)
  // TODO 发送爬取任务请求
  // const options = {
  //   method: 'POST',
  //   url: 'http://localhost:2514/admin/crawler/crawl',
  //   params: {datasource: props.datasource_id},
  //   headers: {
  //     Authorization: store.pb.authStore.token,
  //   },
  // }
  // axios.request(options).then(function (response) {
  //   console.log(response.data);
  // }).catch(function (error) {
  //   console.error(error);
  // });
}
defineExpose({
  createCrawlTask,
})
</script>

<template>
<div>
  <div>
    <el-collapse accordion>
      <el-collapse-item title="基础设置" name="1">
        <el-divider />
        <el-form-item label="网站主界面url">
          <el-input v-model="targetOriginStr"
                    placeholder="e.g. https://a.example.com/index.html,https://b.example.com(用英文逗号分隔)"
                    @change="updateTargetOrigin"
          />
        </el-form-item>
        <el-form-item label="允许域名">
          <el-input
              v-model="allowOriginStr"
              placeholder="e.g. a.example.com,b.example.com(用英文逗号分隔)"
              @change="updateAllowOrigin"
          />
        </el-form-item>
        <el-form-item label="禁止域名">
          <el-input
              v-model="disallowOriginStr"
              placeholder="e.g. a.example.com,b.example.com(用英文逗号分隔)"
              @change="updateDisallowOrigin"
          />
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="高级设置"  name="2">
        <el-divider />
        <el-form-item label="启用标题过滤器">
          <el-switch v-model="crawlTaskRecord.config.title_filter" />
        </el-form-item>
        <el-form-item label="最长中文标题" v-show="crawlTaskRecord.config.title_filter">
          <el-input-number v-model="crawlTaskRecord.config.max_length_c" />
        </el-form-item>
        <el-form-item label="最长英文标题" v-show="crawlTaskRecord.config.title_filter">
          <el-input-number v-model="crawlTaskRecord.config.max_length_e" />
        </el-form-item>
        <el-form-item label="最短文章长度">
          <el-input-number v-model="crawlTaskRecord.config.min_page_content_length" />
        </el-form-item>
        <el-form-item label="最大爬取深度">
          <el-input-number v-model="crawlTaskRecord.config.max_depth" />
        </el-form-item>
        <el-form-item label="允许一次外链">
          <el-switch v-model="crawlTaskRecord.config.allow_external_link" />
        </el-form-item>
      </el-collapse-item>
    </el-collapse>


  </div>

</div>
</template>

<style scoped>

</style>