<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.nickName" label="昵称"/>
			<ui-text v-model="data.taskName" label="任务名称"/>
			<ui-text v-model="data.userName" label="用户名称"/>
			<ui-date v-model="data.beginDate" label="开始时间" type="datetime"/>
			<ui-date v-model="data.endDate" label="结束时间" type="datetime"/>
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="export" @click="exportExcel">导出</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/yuwanbox/page" :search="condition" v-slot="{data}" :search-com="$refs.search" autolimitwidth>
			<ui-text v-model="data.mediaMoney" label="总返还额度"/>
			<ui-text v-model="data.mobile" label="手机号"/>
			<ui-text v-model="data.nickName" label="用户昵称"/>
			<ui-text v-model="data.userName" label="用户姓名"/>
			<ui-text v-model="data.rewardDescription" label="收益描述"/>
			<ui-text v-model="data.rewardTypeText" label="收益类型说明"/>
			<ui-text v-model="data.rewardUserRate" label="用户收益比"/>
			<ui-text v-model="data.taskDate" label="任务时间"/>
			<ui-text v-model="data.taskName" label="任务名称"/>
			<ui-text v-model="data.userMoney" label="用户实际收益"/>
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
		methods: {
			exportExcel() {
				var headers = Object.assign(this.search, {
					token: this.$store.state.app.token,
				});
				window.open(WEBCONFIG.connectPath + '/admin/yuwanbox/export?' + qs.stringify(headers));
			},
		},
	}
</script>

<style>
</style>
