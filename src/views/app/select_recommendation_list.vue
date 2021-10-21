<template>
	<div class="com-list-content">
		<com-search :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.goodsid" label="商品ID" />
			<ui-text v-model="data.name" label="商品名称" />
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="add" @click="add">增加</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/selectionRecommended/listPage" :search="condition" v-slot="{data}">
			<!-- <ui-text v-model="data.goodsid" label="商品ID" /> -->
			<ui-number v-model="data.goodsid" label="商品ID"/>
			<ui-text v-model="data.name" label="商品名称" />
			<ui-image v-model="data.imgurl" label="图片" />
			<ui-text v-model="data.price" label="商品价格"/>
			<ui-number v-model="data.sort" label="排序"/>
			<!-- <ui-text v-model="data.description" label="商品描述" /> -->
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
			this.$dialog('select_recommendation_detail',{type:'add',data:{}},()=>{
				this.$refs.table.refresh();
			})
		},
		edit(data){
			this.$dialog('select_recommendation_detail',{type:'edit',data:data},()=>{
				this.$refs.table.refresh();
			})
		},
		remove(data){
			this.$axios.delete('/admin/selectionRecommended/'+data.id)
			.then(data=>{
				this.$refs.table.refresh();
			}).end();
		}
	}
}
</script>

<style>
</style>
