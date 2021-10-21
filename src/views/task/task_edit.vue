<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-hidden v-model="data.id" autosubmit/>
		<ui-select v-model="data.typeId" label="任务分类" url="/admin/taskType" value-field="id" text-field="typeName" required/>
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
			this.$axios.request({url:'/admin/task/editType/'+this.params.data.id,data:this.submitData,method:this.params.type,urlencode: true})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>