<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.enterpriseName" label="企业名称"/>
			<ui-text v-model="data.serialNumber" label="充值单号"/>
			<ui-date v-model="data.startTime" label="充值开始时间"/>
			<ui-date v-model="data.endTime" label="充值结束时间"/>
			<ui-select v-model="data.approvalStatus" label="审核状态">
				<ui-option value="1" text="待审核"/>
				<ui-option value="2" text="通过"/>
				<ui-option value="3" text="驳回"/>
			</ui-select>
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/providerRechargeRecord/listPage" :search="condition" v-slot="{data}" :search-com="$refs.search">
			<ui-text v-model="data.enterpriseName" label="企业名称"/>
			<ui-text v-model="data.serialNumber" label="充值单号"/>
			<ui-number v-model="data.amount" label="充值DD"/>
			<ui-image v-model="data.screenshot" label="充值截图"/>
			<ui-date v-model="data.createTime" label="充值时间" type="datetime"/>
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
			this.$dialog('recharge_examine',{data:data},()=>{
				this.$refs.table.refresh(true);
			})
		},
	}
}
</script>

<style>
</style>