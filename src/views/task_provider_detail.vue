<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-hidden v-model="data.id" autosubmit/>
		<ui-text v-model="data.enterpriseName" label="企业名称" required/>
		<ui-text v-model="data.contacts" label="联系人"/>
		<ui-text v-model="data.no" label="身份证号" value-type="idcard" />
		<ui-text v-model="data.phone" label="联系电话" value-type="phone"/>
		<ui-text v-model="data.address" label="地址"/>
		<ui-text v-model="data.username" label="登录名" required/>
		<ui-text v-model="data.password" label="密码" show-password :required="params.type=='add'?'':undefined"/>
		<ui-template>
			<ui-button type="submit" @submit="submit"></ui-button>
			<ui-button type="reset" v-if="params.type=='add'"></ui-button>
		</ui-template>
	</ui-form>
</template>

<script>
export default {
	props:['params','close'],
	data(){
		return {
			submitData:{}
		};
	},
	methods:{
		submit(){
			this.$axios.request({url:'/admin/taskProvider',data:this.submitData,method:this.params.type})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>