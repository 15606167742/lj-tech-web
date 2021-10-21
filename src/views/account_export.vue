<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" :columns="1" v-slot="{data}">
		<ui-date v-model="data.startTime" label="开始时间" type="datetime" :max="$moment(data.endTime).valueOf()<$moment().valueOf()?data.endTime:$moment().format('YYYY-MM-DD HH:mm:ss')" @change="changeStartTime" />
		<ui-date v-model="data.endTime" label="结束时间" type="datetime" :min="data.startTime" :max="$moment().format('YYYY-MM-DD HH:mm:ss')" @change="changeEndTime" />
		<ui-template>
			<div class="tip">选择时间精确到小时</div>
			<div class="tip" v-if="params.data.type == 'user'">默认时间段为昨日11:00:00~今日11:00:00</div>
			<div class="tip" v-else-if="params.data.type == 'roll'">默认时间段为7月21日17:00:00~今日23:00:00</div>
		</ui-template>
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
		changeStartTime(value){
			this.params.data.startTime = this.$moment(value).startOf('hour').format('YYYY-MM-DD HH:mm:ss');
		},
		changeEndTime(value){
			this.params.data.endTime = this.$moment(value).startOf('hour').format('YYYY-MM-DD HH:mm:ss');
		},
		submit(){
			let url;
			if (this.params.data.type == 'user') {
				url = '/admin/account/exportNewAccount';
			} else if (this.params.data.type == 'roll') {
				url = '/admin/account/exportNewMill';
			}
			const exportUrl = WEBCONFIG.connectPath+url+
			'?token='+store.state.app.token+
			'&beginDate='+this.submitData.startTime+'&endDate='+this.submitData.endTime;
        	window.open(exportUrl);
        	this.close();
		},
	},
}
</script>

<style scoped lang="scss">
	.tip{
		font-size: 12px;
		color: red;
	}
</style>