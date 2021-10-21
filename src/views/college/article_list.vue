<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.title" label="标题"/>
			<ui-select v-model="data.typeId" label="类别" url="/admin/college/pcGetTypeList" value-field="id" text-field="typeName"/>
			<ui-date v-model="data.startTime" label="开始时间" type="datetime"/>
			<ui-date v-model="data.endTime" label="结束时间" type="datetime"/>
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="add" @click="add">增加</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/college/articleList" :search="condition" v-slot="{data}" :search-com="$refs.search">
			<ui-text v-model="data.title" label="标题"/>
			<ui-text v-model="data.typeName" label="类别"/>
			<ui-image v-model="data.url" label="图片" size="mini"/>
			<ui-number v-model="data.clicks" label="点击量"/>
			<ui-text v-model="data.description" label="描述"/>
			<ui-date v-model="data.createTime" label="创建时间" type="datetime"/>
			<ui-template label="操作">
				<ui-button type="edit" @click="edit(data)" />
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
			this.$dialog('article_detail',{type:'add',data:{}},()=>{
				this.$refs.table.refresh(true);
			})
		},
		edit(data){
			this.$dialog('article_detail',{type:'edit',data:data},()=>{
				this.$refs.table.refresh();
			})
		},
		remove(data){
			this.$axios.delete('/admin/college/deleteArticle?id='+data.id)
			.then(data=>{
				this.$refs.table.refresh();
			}).end();
		}
	}
}
</script>

<style>
</style>