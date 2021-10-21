<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.realName" label="姓名"/>
			<ui-text v-model="data.mobile" label="手机号"/>
			<ui-date v-model="data.startTime" label="提现开始时间"/>
			<ui-date v-model="data.endTime" label="提现结束时间"/>
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="add" @click="add">增加</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/balanceChangeRecord/listPage?changeType=15" :search="condition" v-slot="{data}" :search-com="$refs.search" autolimitwidth>
			<ui-image v-model="data.headImg" label="头像"/>
			<ui-text v-model="data.realName" label="姓名"/>
			<ui-text v-model="data.mobile" label="手机号"/>
			<ui-number v-model="data.changeAmount" label="变动DD"/>
			<ui-text v-model="data.changeTypeDesc" label="变动类型"/>
			<ui-image v-model="data.screenshot" label="截图"/>
			<ui-text v-model="data.currentAmount" label="当前余额"/>
			<ui-date v-model="data.createTime" label="变动时间" type="datetime"/>
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
		add(){
			this.$dialog('withdrawal_offline_detail',{type:'add',data:{}},()=>{
				this.$refs.table.refresh(true);
			});
		},
	}
}
</script>

<style>
</style>