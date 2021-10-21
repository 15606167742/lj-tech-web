<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-hidden v-model="data.id" autosubmit/>
		<ui-image v-model="data.typeIcon" label="领哆哆分类图标"/>
		<ui-image v-model="data.typeIconHk" label="海客分类图标"/>
		<ui-select v-model="data.difficulty" label="难度" url="/enum/listDifficulty" value-field="value" text-field="desc"/>
		<ui-text v-model="data.typeName" label="分类名称" required/>
		<ui-number v-model="data.sort" label="分类排序"/>
		<ui-text v-model="data.profitSection" label="任务DD区间"/>
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
			this.$axios.request({url:'/admin/taskType',data:this.submitData,method:this.params.type})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>