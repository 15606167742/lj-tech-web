<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.realName" label="姓名" />
			<ui-text v-model="data.mobile" label="手机号" />
			<ui-text v-model="data.orderNumber" label="提现单号" />
			<ui-date v-model="data.startTime" label="提现开始时间" />
			<ui-date v-model="data.endTime" label="提现结束时间" />
			<ui-select v-model="data.approvalStatus" label="审核状态">
				<ui-option value="1" text="待审核" />
				<ui-option value="2" text="通过" />
				<ui-option value="3" text="驳回" />
				<ui-option value="4" text="确认中" />
				<ui-option value="5" text="支付失败" />
			</ui-select>
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="export" @click="exportExcel"></ui-button>
				<ui-button button-type="primary" icon="el-icon-circle-check" @click="examineAll">批量通过</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/cashOut/listPage?cashOutType=2" :search="condition" v-slot="{data}" :search-com="$refs.search"
		 autolimitwidth :default-page-size="50" row-key="id" selection-column @selection-change="examineSelectionChange">
			<ui-text v-model="data.realName" label="姓名" />
			<ui-select v-model="data.accountType" label="账户类型">
				<ui-option value="1" text="用户" />
				<ui-option value="2" text="供应商" />
			</ui-select>
			<ui-text v-model="data.mobile" label="手机号" />
			<ui-text v-model="data.orderNumber" label="提现单号" width="180" />
			<ui-number v-model="data.amount" label="提现DD" />
			<!-- <ui-image v-model="data.screenshot" label="提现截图"/> -->
			<ui-date v-model="data.createTime" label="提现时间" type="datetime" />
			<ui-text v-model="data.approvalStatusDesc" label="审核状态" />
			<ui-text v-model="data.statusMessage" label="支付消息" />
			<ui-text v-model="data.rejectReason" label="拒绝理由" />
			<ui-template label="操作">
				<ui-button icon="el-icon-s-claim" buttonType="primary" @click="examine(data)" :disabled="data.approvalStatus!=1">审核</ui-button>
			</ui-template>
		</com-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				search: {},
				condition: {},
				examineList: [],
			};
		},
		mounted() {},
		methods: {
			examine(data) {
				this.$dialog('withdrawal_detail', {
					data: data
				}, () => {
					this.$refs.table.refresh();
				})
			},
			exportExcel() {
				this.$dialog('withdrawal_online_export', {
					data: {}
				}, {
					width: '600px'
				}, () => {});
			},
			examineSelectionChange(rows) {
				this.examineList = rows;
			},
			examineAll() {
				if (this.examineList.length == 0) {
					this.$msgbox('必须选择至少一个');
					return;
				}
			
				let ids = [];
				this.examineList.forEach(item => {
					ids.push(item.id);
				})
			
				this.$confirm('是否确认全部审核通过?').then(() => {
					this.$axios.request({
							url: '/admin/cashOut/batchPass',
							data: {
								ids: ids.join(',')
							},
							method: 'post',
							urlencode: true
						})
						.then(data => {
							this.$refs.table.refresh();
						}).end();
				})
			},
		}
	}
</script>

<style>
</style>
