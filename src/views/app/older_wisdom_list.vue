<template>
	<div class="com-list-content">
		<com-search :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.title" label="标题" />
			<ui-select v-model="data.typeId" label="类别" url="/admin/wisdomendowment/getTypeList" value-field="id" text-field="typeName"/>
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="add" @click="add">增加</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/wisdomendowment/getContentList" :search="condition" v-slot="{data}" autolimitwidth>
			<ui-text v-model="data.title" label="标题" />
			<ui-text v-model="data.author" label="作者" />
			<ui-text v-model="data.description" label="描述" />
			<ui-image v-model="data.url" label="图片" />
			<ui-number v-model="data.clicks" label="点击量" />
			<ui-text v-model="data.typeName" label="类别名称" />
			<ui-date v-model="data.createTime" label="创建时间" type="datetime"/>
			<ui-template label="操作">
				<ui-button type="edit" @click="edit(data)"/>
				<ui-button type="delete" :disabled="data.userType==2" @click="remove(data)"/>
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
			this.$dialog('older_wisdom_detail',{type:'add',data:{}},()=>{
				this.$refs.table.refresh();
			})
		},
		edit(data){
			this.$dialog('older_wisdom_detail',{type:'edit',data:data},()=>{
				this.$refs.table.refresh();
			})
		},
		remove(data){
			this.$axios.delete('/admin/wisdomendowment/deleteContent?id='+data.id)
			.then(data=>{
				this.$refs.table.refresh();
			}).end();
		}
	}
}
</script>

<style>
</style>
