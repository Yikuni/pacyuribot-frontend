// src/store.js
import {reactive} from 'vue';
import PocketBase from 'pocketbase';
import Client from "pocketbase";
import axios from "axios";

const initializeStore = async ()=>{
    let pb: Client;
    let config = {}
    await fetch("/config.json").then((resp)=>resp.json())
        .then((res)=>{
            config = res
            console.log(res)
            pb = new PocketBase(res.pocketbase)
        })
    return reactive({
        pb,
        methods:{
            login: async(email: string, password: string)=>{
                await pb.collection('users').authWithPassword(
                    email,
                    password,
                )
                return pb.authStore.isValid
            },
            activateDatasource: (datasourceID: string)=>{
                let options = {
                    method: 'POST',
                    url: 'http://localhost:2514/admin/datasource/activate',
                    params: {datasource: datasourceID},
                    headers: {
                        Authorization: pb.authStore.record.token,
                    }
                };

                return axios.request(options)
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
        },
        config:config
    })
}
export const store = await initializeStore()