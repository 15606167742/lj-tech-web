<template>
	<div class="com-list-content">
		<com-search :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" :url="'/admin/coinChangeRecord/listPage?accountId='+id" :search="condition" v-slot="{data}"
		 autolimitwidth noautobind>
			<ui-text v-model="data.realName" label="姓名" />
			<ui-number v-model="data.currentAmount" label="当前余额" />
			<ui-number v-model="data.changeAmount" label="变动余额" />
			<ui-date v-model="data.createTime" label="创建时间" type="datetime" />
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
				id: '',
			};
		},
		activated() {
			if (this.$route.params.accountId) {
				this.id = this.$route.params.accountId
			}
		},
		methods: {}
	}
</script>

<style>
</style>
