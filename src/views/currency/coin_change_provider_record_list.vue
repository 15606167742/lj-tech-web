<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.realName" label="企业名" />
			<ui-select v-model="data.changeType" label="变动类型">
				<ui-option value="6" text="供应商分成"/>
				<ui-option value="7" text="平台赠送"/>
			</ui-select>
			<ui-date v-model="data.startTime" label="变动开始时间" :max="data.endTime"/>
			<ui-date v-model="data.endTime" label="变动结束时间" :min="data.startTime"/>
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/coinChangeRecord/listProviderPage" :search="condition" v-slot="{data}" :search-com="$refs.search">
			<!-- <ui-text v-model="data.headImg" label="头像"/> -->
			<ui-text v-model="data.realName" label="企业名" />
			<ui-number v-model="data.currentAmount" label="当前余额" />
			<ui-number v-model="data.changeAmount" label="变动余额" />
			<ui-date v-model="data.createTime" label="变动时间" type="datetime" />
			<ui-text v-model="data.description" label="描述" />
			<ui-text v-model="data.changeTypeDesc" label="变动类型" />
			<ui-text v-model="data.remark" label="备注" />
		</com-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				search: {},
				condition: {},
			};
		},
		mounted() {},
		methods: {}
	}
</script>

<style>
</style>
