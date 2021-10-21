<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.orderNo" label="交单编号"/>
			<ui-text v-model="data.mobile" label="手机号"/>
			<!-- <ui-select v-model="data.type" label="变更类型">
				<ui-option value="1" text="任务收益"/>
				<ui-option value="2" text="自动兑换现金"/>
				<ui-option value="3" text="达人广告现金分红"/>
			</ui-select> -->
			<ui-date v-model="data.startTime" label="开始时间" type="datetime"/>
			<ui-date v-model="data.endTime" label="结束时间" type="datetime"/>
			<ui-template>
				<ui-button type="search"></ui-button>
				<!-- <ui-button type="export" @click="exportExcel">导出</ui-button> -->
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/accountTask/queryXyTask" :search="condition" v-slot="{data}" :search-com="$refs.search" autolimitwidth>
			<ui-text v-model="data.orderNo" label="交单编号"/>
			<ui-text v-model="data.mobile" label="手机号" value-type="phone"/>
			<ui-text v-model="data.nickName" label="昵称"/>
			<ui-text v-model="data.realName" label="姓名"/>
			<!-- <ui-select v-model="data.type" label="变更类型">
				<ui-option value="1" text="任务收益"/>
				<ui-option value="2" text="自动兑换现金"/>
				<ui-option value="3" text="达人广告现金分红"/>
			</ui-select> -->
			<ui-text v-model="data.name" label="任务名称"/>
			<ui-text v-model="data.rewardCoin" label="变更金豆"/>
			<ui-date v-model="data.createTime" label="审核通过时间" type="datetime"/>
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
			// exportExcel() {
			// 	var headers = Object.assign(this.search, {
			// 		token: this.$store.state.app.token,
			// 	});
			// 	window.open(WEBCONFIG.connectPath + '/admin/yuwanbox/export?' + qs.stringify(headers));
			// },
		},
	}
</script>

<style>
</style>
