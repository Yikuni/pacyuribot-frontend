import { createRouter, createWebHistory } from 'vue-router'
import MainPanel from "../views/MainPanel.vue"
import UserLogin from "../views/UserLogin.vue";
import ModelList from "../views/ModelList.vue";
import RegisterValidation from "../views/RegisterValidation.vue";
import ModelDetails from "../views/ModelDetails.vue";
import ModelBasicInfo from "../views/model/ModelBasicInfo.vue";
import ModelDataSource from "../views/model/ModelDataSource.vue";
import ChatHistory from "../views/model/ChatHistory.vue";
import ChatbotPreview from "../views/model/ChatbotPreview.vue";
import ModelSettings from "../views/model/ModelSettings.vue";
import AddToSite from "../views/model/AddToSite.vue";
import EditAppearance from "../views/model/EditAppearance.vue";
import CreateModel from "../views/CreateModel.vue";
import AddData from "../views/model/AddData.vue";
import DatasourceInfo from "../views/model/DatasourceInfo.vue";
import DatasourceCreate from "../views/model/DatasourceCreate.vue";

// 路由配置
const routes = [
    {
        path: '/',
        redirect: '/main'
    },{
        path: '/main',
        name: 'main',
        component: MainPanel,
        children: [
            {
                path: '/main',
                redirect: '/main/models'
            },{
                path: '/main/models',
                name: 'models',
                component: ModelList
            },{
                path: '/main/createModel',
                name: 'createModel',
                component: CreateModel
            },{
                path: '/main/model',
                name: 'model',
                component: ModelDetails,
                children: [
                    {
                        path: '/main/model',
                        redirect: '/main/model/dataSource'
                    },{
                        path: '/main/model/basicInfo',
                        name: 'modelBasicInfo',
                        component: ModelBasicInfo
                    },{
                        path: '/main/model/dataSource',
                        name: 'dataSource',
                        component: ModelDataSource
                    },{
                        path: '/main/model/chatHistory',
                        name: 'chatHistory',
                        component: ChatHistory
                    },{
                        path: '/main/model/chatbotPreview',
                        name: 'chatbotPreview',
                        component: ChatbotPreview
                    },{
                        path: '/main/model/settings',
                        name: 'settings',
                        component: ModelSettings
                    },{
                        path: '/main/model/addToSite',
                        name: 'addToSite',
                        component: AddToSite
                    },{
                        path: '/main/model/editAppearance',
                        name: 'editAppearance',
                        component: EditAppearance
                    },{
                        path: '/main/model/addData',
                        name: 'addData',
                        component: AddData
                    },{
                        path: '/main/model/datasourceCreate/:method',
                        name: 'datasourceCreate',
                        component: DatasourceCreate
                    },{
                        path: '/main/model/info/:id',
                        name: 'datasourceInfo',
                        component: DatasourceInfo
                    },
                ]
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: UserLogin
    },
    {
        path: '/registerValidation',
        name: 'registerValidation',
        component: RegisterValidation
    },

]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
