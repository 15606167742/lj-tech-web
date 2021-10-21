<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.realName" label="企业名"/>
			<ui-text v-model="data.orderNumber" label="提现单号"/>
			<ui-date v-model="data.startTime" label="提现开始时间"/>
			<ui-date v-model="data.endTime" label="提现结束时间"/>
			<ui-select v-model="data.approvalStatus" label="审核状态">
				<ui-option value="1" text="待审核"/>
				<ui-option value="2" text="通过"/>
				<ui-option value="3" text="驳回"/>
			</ui-select>
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="export" @click="$refs.search.exports('任务商余额提现记录')"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/cashOut/listProviderPage" :search="condition" v-slot="{data}" :search-com="$refs.search" autolimitwidth>
			<ui-text v-model="data.realName" label="企业名"/>
			<ui-select v-model="data.accountType" label="账户类型">
				<ui-option value="1" text="用户"/>
				<ui-option value="2" text="供应商"/>
			</ui-select>
			<ui-text v-model="data.orderNumber" label="提现单号" width="180"/>
			<ui-number v-model="data.amount" label="提现DD"/>
			<!-- <ui-image v-model="data.screenshot" label="提现截图"/> -->
			<ui-date v-model="data.createTime" label="提现时间" type="datetime"/>
			<ui-text v-model="data.approvalStatusDesc" label="审核状态"/>
			<ui-text v-model="data.rejectReason" label="拒绝理由"/>
			<ui-template label="操作">
				<ui-button icon="el-icon-s-claim" buttonType="primary" @click="examine(data)" :disabled="data.approvalStatus!=1">审核</ui-button>
			</ui-template>
		</com-table>
	</div>
</template>

<script>
export default {
	data(){
		return {
			search:{},
			condition:{},
		};
	},
	mounted(){
	},
	methods:{
		examine(data){
			this.$dialog('withdrawal_balance_detail',{data:data},()=>{
				this.$refs.table.refresh(true);
			})
		},
	}
}
</script>

<style>
</style>