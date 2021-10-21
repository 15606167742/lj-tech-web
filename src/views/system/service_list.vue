<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-template>
				<ui-button type="add" @click="add">增加</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/customer/listPage" :search="condition" v-slot="{data}" :search-com="$refs.search">
			<ui-text v-model="data.name" label="客服名"/>
			<ui-image v-model="data.code" label="二维码"/>
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
	mounted(){
	},
	methods:{
		add(){
			this.$dialog('service_detail',{type:'add',data:{}},{width:'600px'},()=>{
				this.$refs.table.refresh(true);
			})
		},
		edit(data){
			this.$dialog('service_detail',{type:'edit',data:data},{width:'600px'},()=>{
				this.$refs.table.refresh();
			})
		},
		remove(data){
			this.$axios.delete('/admin/customer/'+data.id)
			.then(data=>{
				this.$refs.table.refresh();
			}).end();
		}
	}
}
</script>

<style>
</style>