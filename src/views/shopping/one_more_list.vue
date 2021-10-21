<template>
	<div class="com-list-content">
		<com-search :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.code" label="编号" />
			<ui-text v-model="data.name" label="卡名" />
			<ui-select v-model="data.cardType" label="卡片类型">
				<ui-option value="1" text="会员卡" />
				<ui-option value="2" text="多开卡" />
			</ui-select>
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="add" @click="add">增加</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/deviceCard/page" :search="condition" v-slot="{data}">
			<ui-text v-model="data.code" label="编号" />
			<ui-text v-model="data.name" label="卡名" />
			<ui-select v-model="data.cardType" label="卡片类型">
				<ui-option value="1" text="会员卡" />
				<ui-option value="2" text="多开卡" />
			</ui-select>
			<ui-number v-model="data.boundQty" label="可绑定手机号数量"/>
			<ui-number v-model="data.validateDay" label="有效天数"/>
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
			this.$dialog('one_more_detail',{type:'add',data:{}},()=>{
				this.$refs.table.refresh();
			})
		},
		edit(data){
			this.$dialog('one_more_detail',{type:'edit',data:data},()=>{
				this.$refs.table.refresh();
			})
		},
		remove(data){
			this.$axios.delete('/admin/deviceCard/remove?id='+data.id)
			.then(data=>{
				this.$refs.table.refresh();
			}).end();
		}
	}
}
</script>

<style>
</style>
