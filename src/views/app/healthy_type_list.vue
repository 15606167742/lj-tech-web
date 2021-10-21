<template>
	<div class="com-list-content">
		<com-search :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-template>
				<!-- <ui-button type="search"></ui-button> -->
				<ui-button type="add" @click="add">增加</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/healthy/getType" :search="condition" v-slot="{data}">
			<ui-text v-model="data.typeName" label="类别名称" />
			<ui-number v-model="data.sort" label="排序" :max="99"/>
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
			this.$dialog('healthy_type_detail',{type:'add',data:{}},()=>{
				this.$refs.table.refresh();
			})
		},
		edit(data){
			this.$dialog('healthy_type_detail',{type:'edit',data:data},()=>{
				this.$refs.table.refresh();
			})
		},
		remove(data){
			this.$axios.delete('/admin/healthy/deleteType?id='+data.id)
			.then(data=>{
				this.$refs.table.refresh();
			}).end();
		}
	}
}
</script>

<style>
</style>
