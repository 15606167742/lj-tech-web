<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" :columns="1" v-slot="{data}">
		<ui-date v-model="data.startTime" label="开始时间" :max="data.endTime" required/>
		<ui-date v-model="data.endTime" label="结束时间" :min="data.startTime" required/>
		<ui-template>
			<ui-button type="submit" @submit="submit" button-type="success" icon="el-icon-download">导出</ui-button>
		</ui-template>
	</ui-form>
</template>

<script>
import store from '@/store'

export default {
	props:['params','close'],
	data(){
		return {
			submitData:{},
		};
	},
	methods:{
		submit(){
			const exportUrl = WEBCONFIG.connectPath+
			'/admin/cashOut/exportTaskCashOut?token='+store.state.app.token+
			'&startTime='+this.submitData.startTime+'&endTime='+this.submitData.endTime;
        	window.open(exportUrl);
        	this.close();
		},
	},
}
</script>

<style>
</style>