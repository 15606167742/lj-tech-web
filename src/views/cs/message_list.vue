<template>
	<div class="com-list-content">
		<com-search :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.accountMobile" label="用户手机号" />
			<ui-text v-model="data.contactPhone" label="联系人手机号" />
			<ui-select v-model="data.topMessageTypeId" label="顶级类别" url="/admin/feedback-message-types/top-level" value-field="id" text-field="title"/>
			<ui-select v-model="data.messageTypeIdList" label="下级类别" :url="'/admin/feedback-message-types/by-parentId/'+data.topMessageTypeId" value-field="id" text-field="title" multiple v-if="data.topMessageTypeId"/>
			<ui-date v-model="data.createTimeStart" label="开始时间" type="datetime"/>
			<ui-date v-model="data.createTimeEnd" label="结束时间" type="datetime"/>
			<ui-select v-model="data.replied" label="是否回复">
				<ui-option value="0" text="是"/>
				<ui-option value="1" text="否"/>
			</ui-select>
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/feedback-messages/list-page" :search="condition" v-slot="{data}" autolimitwidth>
			<ui-text v-model="data.account" label="用户手机号" />
			<ui-text v-model="data.contactName" label="联系人姓名" />
			<ui-text v-model="data.contactPhone" label="联系人手机号" />
			<ui-text v-model="data.typeTitleList" label="留言类型" />
			<ui-text v-model="data.message" label="留言内容" />
			<ui-date v-model="data.createTime" label="创建时间" type="datetime"/>
			<ui-select v-model="data.replied" label="是否回复">
				<ui-option value="0" text="是"/>
				<ui-option value="1" text="否"/>
			</ui-select>
			<ui-text v-model="data.reply" label="客服回复信息" />
			<ui-template label="操作">
				<ui-button button-type="primary" icon="el-icon-view" @click="view(data)">查看</ui-button>
				<ui-button icon="el-icon-chat-dot-round" buttonType="primary" @click="reply(data)" :disabled="data.replied==0">回复</ui-button>
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
	methods:{
		view(data) {
			this.$dialog('message_detail', {
				type: 'view',
				data
			})
		},
		reply(data){
			this.$dialog('message_reply',{type:'edit',data:data},()=>{
				this.$refs.table.refresh();
			})
		},
	}
}
</script>

<style>
</style>
