<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.taskDataId" label="任务ID"/>
			<ui-text v-model="data.taskDataName" label="任务名称"/>
			<ui-text v-model="data.nickName" label="昵称"/>
			<ui-text v-model="data.mobile" label="手机号"/>
			<ui-select v-model="data.taskDataReviewStatus" label="审核状态">
				<ui-option value="0" text="审核中"/>
				<ui-option value="2" text="已完成"/>
				<ui-option value="-1" text="未通过"/>
			</ui-select>
			<ui-date v-model="data.startDate" label="开始时间" type="datetime"/>
			<ui-date v-model="data.endDate" label="结束时间" type="datetime"/>
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="export" @click="exportExcel">导出</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/taskVideo" :search="condition" v-slot="{data}" :search-com="$refs.search" autolimitwidth>
			<ui-text v-model="data.nickName" label="昵称"/>
			<ui-text v-model="data.mobile" label="手机号"/>
			<ui-text v-model="data.taskDataName" label="任务名称"/>
			<ui-text v-model="data.taskDataCybemoney" label="展示DD" value-type="phone"/>
			<ui-text v-model="data.taskDataRewardMoney" label="媒体的任务DD" value-type="phone"/>
			<ui-date v-model="data.submitTime" label="任务提交时间" type="datetime"/>
			<ui-date v-model="data.notifyTime" label="任务审核时间" type="datetime"/>
			<ui-text :value="data.taskDataReviewStatus | getStatusStr" label="任务审核状态"/>
			<ui-textarea v-model="data.taskDataReviewFailureReas" label="审核失败原因"/>
		</com-table>
	</div>

</template>

<script>
	import qs from 'qs'
	
	export default {
		data() {
			return {
				search: {},
				condition: {}
			};
		},
		filters: {
			getStatusStr(v) {
				let str = ''
				if (v === 0) {
					str = '审核中'
				} else if (v === 2) {
					str = '成功'
				} else if (v === -1) {
					str = '失败'
				}
				return str
			},
			getFirst(value) {
				if (value.length < 1) return ''
				return value[0];
			},
			setFileList(value) {
				if(!value){
					return [];
				}
				let selfFileList = [];
				value.forEach(o=>{
					if(o.type == 4){
						if (o.imgs != null && o.imgs != '') {
							let vals = o.imgs.split(',');
							for (let i = 0; i < vals.length; i++) {
								if (vals[i].slice(0, 4).toLowerCase() == 'http') {
									selfFileList.push(vals[i]);
								} else {
									selfFileList.push(WEBCONFIG.resourcePath + vals[i]);
								}
							}
						}
					}
				})
				return selfFileList;
			}
		},
		mounted() {},
		methods: {
			exportExcel() {
				var headers = Object.assign(this.search, {
					token: this.$store.state.app.token,
				});
				window.open(WEBCONFIG.connectPath + '/admin/taskVideo/export?' + qs.stringify(headers));
			},
		},
	}
</script>

<style>
</style>
