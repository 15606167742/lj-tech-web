<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-hidden v-model="data.id" autosubmit/>
		<ui-textarea v-model="data.message" label="留言内容" view/>
		<ui-textarea v-model="data.msg" label="回复信息" required/>
		<ui-date v-model="data.createTime" label="创建时间" type="datetime" view/>
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
			this.$axios.request({url:'/admin/feedback-messages/reply',data:this.submitData,method:this.params.type,urlencode:true})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>
