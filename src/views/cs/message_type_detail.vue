<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-hidden v-model="data.id" autosubmit/>
		<ui-text v-model="data.title" label="标题" :maxlength="25" required/>
		<ui-select v-model="data.level" label="等级" required v-if="params.type=='add'">
			<ui-option value="0" text="顶级类别"/>
			<ui-option value="1" text="下级类别"/>
		</ui-select>
		<ui-select v-model="data.parentId" label="上级类别" url="/admin/feedback-message-types/top-level" value-field="id" text-field="title" required v-if="data.level==='1'"/>
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
			this.$axios.request({url:'/admin/feedback-message-types',data:this.submitData,method:this.params.type})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>
