<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.realName" label="姓名"/>
			<ui-text v-model="data.mobile" label="手机号"/>
			<ui-select v-model="data.changeType" label="变动类型">
				<!-- <ui-option value="1" text="好友分成"/>
				<ui-option value="2" text="粉丝分成"/>
				<ui-option value="3" text="运营商分成"/>
				<ui-option value="4" text="合伙人分成"/>
				<ui-option value="5" text="理事分成"/>
				<ui-option value="7" text="合伙人运营分成"/> -->
				<ui-option value="10" text="任务收益"/>
				<ui-option value="11" text="任务提现"/>
				<ui-option value="12" text="服务费提现"/>
				<ui-option value="15" text="线下服务费提现"/>
				<ui-option value="16" text="任务提现拒绝返还"/>
				<ui-option value="17" text="服务费提现拒绝返还"/>
				<ui-option value="18" text="服务费支付失败返还"/>
			</ui-select>
			<ui-date v-model="data.startTime" label="提现开始时间"/>
			<ui-date v-model="data.endTime" label="提现结束时间"/>
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/balanceChangeRecord/listPage" :search="condition" v-slot="{data}" :search-com="$refs.search" autolimitwidth>
			<ui-image v-model="data.headImg" label="头像"/>
			<ui-text v-model="data.realName" label="姓名"/>
			<ui-text v-model="data.mobile" label="手机号"/>
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