// src/store.js
import {reactive} from 'vue';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pocketbase.yikuni.com')
export const store = reactive({
    // 定义全局变量
    pb,
    methods:{
      login: async(email: string, password: string)=>{
          await pb.collection('users').authWithPassword(
              email,
              password,
          )
          return pb.authStore.isValid
      }
    },
    modelInfo:{
        id: ''
    },
    tmp: {
        form: {
            email: '',
            password: '',
            passwordConfirm: ''
        }
    }
});
