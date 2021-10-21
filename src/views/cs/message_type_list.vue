<template>
	<div class="com-list-content">
		<com-search :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.title" label="标题" />
			<ui-select v-model="data.parentId" label="顶级类别" url="/admin/feedback-message-types/top-level" value-field="id" text-field="title"/>
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="add" @click="add">增加</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/feedback-message-types/list-page" :search="condition" v-slot="{data}">
			<ui-text v-model="data.title" label="标题" />
			<ui-select v-model="data.level" label="等级">
				<ui-option value="0" text="顶级类别"/>
				<ui-option value="1" text="下级类别"/>
			</ui-select>
			<ui-date v-model="data.createTime" label="创建时间" type="datetime"/>
			<ui-date v-model="data.updateTime" label="更新时间" type="datetime"/>
			<ui-template label="操作">
				<ui-button type="edit" @click="edit(data)"/>
				<ui-button type="delete" @click="remove(data)"/>
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
		add(){
			this.$dialog('message_type_detail',{type:'add',data:{}},()=>{
				this.$refs.table.refresh();
			})
		},
		edit(data){
			this.$dialog('message_type_detail',{type:'edit',data:data},()=>{
				this.$refs.table.refresh();
			})
		},
		remove(data){
			this.$axios.delete('/admin/feedback-message-types/'+data.id)
			.then(data=>{
				this.$refs.table.refresh();
			}).end();
		}
	}
}
</script>

<style>
</style>
