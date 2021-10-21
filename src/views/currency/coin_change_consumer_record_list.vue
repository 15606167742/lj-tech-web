<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.realName" label="姓名" />
			<ui-text v-model="data.mobile" label="手机号"/>
			<ui-select v-model="data.changeType" label="变动类型">
				<ui-option value="1" text="用户分成"/>
				<ui-option value="2" text="好友分成"/>
				<ui-option value="3" text="粉丝分成"/>
				<ui-option value="4" text="运营商分成"/>
				<ui-option value="5" text="合伙人分成"/>
				<ui-option value="7" text="平台赠送"/>
			</ui-select>
			<ui-date v-model="data.startTime" label="变动开始时间" :max="data.endTime"/>
			<ui-date v-model="data.endTime" label="变动结束时间" :min="data.startTime"/>
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/coinChangeRecord/listPage" :search="condition" v-slot="{data}" :search-com="$refs.search">
			<!-- <ui-text v-model="data.headImg" label="头像"/> -->
			<ui-text v-model="data.realName" label="姓名" />
			<ui-text v-model="data.mobile" label="手机号"/>
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
