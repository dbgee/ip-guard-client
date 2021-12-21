<template>
    <div id="main">
        <div id="operation">
            <el-tag >服务器管理</el-tag>
            <el-button size="small" type="primary" @click="getIP">获取服务器</el-button>
            <el-button size="small" type="warning" @click="addServer">新增服务器</el-button>
            <el-button size="small" type="danger" @click="deleteServer">删除旧服务器</el-button>
            <el-button size="small"  type="info" @click="showlog=!showlog">开启日志</el-button>

        </div>
        <div id="output">
            <ol >
                <li v-for="item in server_info" :key="item.id">
                    <div>
                        {{ip=item.main_ip}}

                        <el-button size="mini" id="copy"
                                   type="success"
                                   circle
                                   v-clipboard:copy="ip"
                                   v-clipboard:success="onCopy"
                                   v-clipboard:error="onError">
                            copy
                        </el-button>
                        <el-tag :type="server_status" size="mini" >{{item.status}} </el-tag>
                        <el-button type="danger" size="mini" @click="forceDelete(item.id)">强制删除</el-button>

                    </div>
                </li>

            </ol>
            <div id="log">
                <hr v-show="showlog">
                <hr v-show="showlog">
                <p v-show="showlog">{{server_data}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Server",
        data(){
            return{
                showlog:false,
                server_data:"",
                serverinfo:[],
                ip:"0.0.0.0",
                server_status:"success",
            }
        },
        computed:{
            server_info(){
                return this.serverinfo
            }
        },
        mounted(){
            this.fetchServers();
        },
        methods:{
            onCopy(){
                if (this.ip!=="0.0.0.0"){
                    this.$message.success("IP 复制成功")
                }else{
                    this.$message.warning("IP 正在初始化，请稍后再试")
                }
            },
            onError(){
                this.$message.warning("IP 复制失败，请检查浏览器是否支持")
            },
            fetchServers(){
                this.axios.get("/list").
                then(res=>{
                    this.server_data=res.data
                    this.serverinfo=res.data.servers
                    if (res.data.code===401){
                        this.$message.warning(res.data.msg);
                        return;
                    }
                    this.server_data=res.data
                }).catch(err=>{
                    this.$message.error(err)
                })
            },
            getIP(){
                this.fetchServers();
                this.$message.success("获取服务器...")

            },
            addServer(){
                this.axios.get("/add").
                then(res=>{
                    this.server_data=res.data
                    if (res.data.code!==200 || res.data.code!==202){
                        this.$message.warning(res.data.msg);
                        return;
                    }
                    this.$message.success("新增服务器中 "+res.status)
                    this.fetchServers();

                }).catch(err=>{
                    this.$message.error(err)
                })
            },
            deleteServer(){
                this.axios.get("/delete?force=false").
                then(res=>{
                    this.server_data=res.data
                    if (res.data.code!==204){
                        this.$message.error(res.data.msg);
                        return;
                    }
                    this.$message.success("删除服务器 中"+res.status)

                }).catch(err=>{
                    this.$message.error(err)
                })
            },
            forceDelete(id){

                this.axios.get("/delete?force=true&id="+id).
                then(res=>{
                    this.server_data=res.data
                    if (res.data.code===401 || res.data.code===500){
                        this.$message.error(res.data.msg);
                        return;
                    }else if(res.data.code===404){
                        this.$message.error(res.data.msg);
                        return;
                    }
                    this.$message.success("强制删除服务器 中"+res.status)

                }).catch(err=>{
                    this.$message.error(err)
                })
            }

        }
    }
</script>

<style scoped>
    #operation{
        display: flex;
        flex-direction: column;
        align-items:center;
        width: 80px;
    }

    #output{
        width: 120vh;
        height: 300px;
        background-color: #2c3e50;
        padding: 15px;
        color: aliceblue;
    }

    #main{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    #log{
        margin-bottom: 15px;
    }

    .el-button{
        width: 110px;
        margin: 8px;
    }
    #copy{
        max-height: 41px;
        max-width: 41px;
    }

</style>