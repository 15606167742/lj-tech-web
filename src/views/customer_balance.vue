<template>
	<div class="com-list-content">
		<!-- <com-search :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
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
		</com-search> -->
		<com-table ref="table" :url="'/admin/accountTask/queryTaskProfit?accountId='+id" :search="condition" v-slot="{data}"
		 autolimitwidth noautobind>
			<ui-number v-model="data.changeAmount" label="变动余额" />
			<ui-select v-model="data.changeType" label="变动类型">
				<ui-option value="11" text="现金提现" />
				<ui-option value="16" text="现金提现拒绝返还" />
				<ui-option value="19" text="金豆兑换" />
			</ui-select>
			<ui-number v-model="data.currentAmount" label="当前余额" />
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
