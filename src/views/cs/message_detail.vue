<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}" :view="params.type=='view'">
		<ui-text v-model="data.account" label="用户手机号" />
		<ui-text v-model="data.contactName" label="联系人姓名" />
		<ui-text v-model="data.contactPhone" label="联系人手机号" />
		<ui-text v-model="data.typeTitleList" label="留言类型" />
		<ui-textarea v-model="data.message" label="留言内容" />
		<ui-date v-model="data.createTime" label="创建时间" type="datetime"/>
		<ui-select v-model="data.replied" label="是否回复">
			<ui-option value="0" text="是"/>
			<ui-option value="1" text="否"/>
		</ui-select>
		<ui-textarea v-model="data.reply" label="客服回复信息" v-if="!data.replied"/>
	</ui-form>
</template>

<script>
export default {
	props:['params','close'],
	data(){
		return {
			submitData:{}
		};
	},
	mounted() {},
	methods:{},
}
</script>

<style>
</style>