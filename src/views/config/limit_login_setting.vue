<template>
	<ui-form :model="info" :transfer-model.sync="submitData" v-slot="{data}" :view="edited?undefined:''" style="width: 600px;" :columns="1">
		<ui-time v-model="data.limitBeginTime" label="限制访问开始时间" required/>
		<ui-time v-model="data.limitEndTime" label="限制访问结束时间" required/>
		<ui-template>
			<ui-button icon="el-icon-edit" button-type="primary" @click="edited=true" v-if="!edited">编辑</ui-button>
			<template v-else>
				<ui-button type="submit" @submit="submit"></ui-button>
				<ui-button button-type="primary" @click="getInfo">取消</ui-button>
			</template>
		</ui-template>
	</ui-form>
</template>

<script>
export default {
	data(){
		return {
			edited: false,
			info:{
				limitBeginTime: null,
				limitEndTime: null,
			},
			submitData:{}
		};
	},
	mounted() {
		this.getInfo();
	},
	methods:{
		getInfo() {
			this.$axios.request({url:'/admin/account/queryTimeConf', method: 'get'})
			.then(data=>{
				this.info.limitBeginTime = data.limitBeginTime;
				this.info.limitEndTime = data.limitEndTime;
				this.edited = false;
			}).end();
		},
		submit(){
			this.$axios.request({url:'/admin/account/updateTimeConf',data:this.submitData,method:'put',urlencode:true})
			.then(data=>{
				this.getInfo();
			}).end();
		}
	},
}
</script>

<style>
</style>