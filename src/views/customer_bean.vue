<template>
	<div class="com-list-content">
		<com-search :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-select v-model="data.type" label="变更类型">
				<ui-option value="1" text="任务收益" />
				<ui-option value="2" text="自动转为现金" />
				<ui-option value="3" text="达人广告现金分红" />
			</ui-select>
			<ui-date v-model="data.startTime" label="开始时间" type="datetime" />
			<ui-date v-model="data.endTime" label="结束时间" type="datetime" />
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" :url="'/admin/accountTask/queryMyAmount?accountId='+id" :search="condition" v-slot="{data}"
		 autolimitwidth noautobind>
			<ui-text :value="data.changeTag+data.amount" label="金豆变更" />
			<ui-select v-model="data.type" label="变更类型">
				<ui-option value="1" text="任务收益" />
				<ui-option value="2" text="自动转为现金" />
				<ui-option value="3" text="达人广告现金分红" />
			</ui-select>
			<ui-text v-model="data.taskName" label="任务名称" />
			<ui-date v-model="data.createTime" label="创建时间" type="datetime" />
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
