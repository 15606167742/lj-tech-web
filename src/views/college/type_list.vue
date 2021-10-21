<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-template>
				<ui-button type="add" @click="add">增加</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/college/getTypeList" :search="condition" v-slot="{data}" :search-com="$refs.search">
			<ui-text v-model="data.typeName" label="类别名称" />
			<ui-number v-model="data.sort" label="排序" :max="99"/>
			<ui-template label="操作">
				<ui-button type="edit" :disabled="data.isModify==0" @click="edit(data)" />
				<ui-button type="delete" :disabled="data.isModify==0" @click="remove(data)"/>
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
		add(){
			this.$dialog('type_detail',{type:'add',data:{}},()=>{
				this.$refs.table.refresh(true);
			})
		},
		edit(data){
			this.$dialog('type_detail',{type:'edit',data:data},()=>{
				this.$refs.table.refresh();
			})
		},
		remove(data){
			this.$axios.delete('/admin/college/deleteType?id='+data.id)
			.then(data=>{
				this.$refs.table.refresh();
			}).end();
		}
	}
}
</script>

<style>
</style>