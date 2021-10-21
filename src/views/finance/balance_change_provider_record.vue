<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.realName" label="企业名"/>
			<ui-select v-model="data.changeType" label="变动类型">
				<ui-option value="6" text="供应商分成"/>
				<ui-option value="8" text="供应商充值"/>
				<ui-option value="9" text="供应商任务扣款"/>
				<ui-option value="13" text="供应商余额提现"/>
				<ui-option value="14" text="供应商余额提现拒绝返还"/>
				<!-- <ui-option value="15" text="线下服务费提现"/> -->
			</ui-select>
			<ui-date v-model="data.startTime" label="提现开始时间"/>
			<ui-date v-model="data.endTime" label="提现结束时间"/>
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/balanceChangeRecord/listProviderPage" :search="condition" v-slot="{data}" :search-com="$refs.search" autolimitwidth>
			<ui-image v-model="data.headImg" label="头像"/>
			<ui-text v-model="data.realName" label="企业名"/>
			<ui-number v-model="data.changeAmount" label="变动DD"/>
			<ui-text v-model="data.changeTypeDesc" label="变动类型"/>
			<ui-image v-model="data.screenshot" label="截图"/>
			<ui-text v-model="data.currentAmount" label="当前余额"/>
			<ui-date v-model="data.createTime" label="变动时间" type="datetime"/>
			<ui-text v-model="data.srcRealName" label="来源用户"/>
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
	}
}
</script>

<style>
</style>