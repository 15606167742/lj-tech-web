<template>
	<div class="com-list-content">
		<!-- <com-search :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.versionName" label="版本名" />
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="add" @click="add">增加</ui-button>
			</ui-template>
		</com-search> -->
		<com-table ref="table" url="/admin/vipUpgrade/queryVipUpgrade" :search="condition" v-slot="{data}">
			<!-- <ui-number v-model="data.level" label="用户级别"/> -->
			<ui-select v-model="data.level" label="用户级别">
				<ui-option value="1" text="一星达人" />
				<ui-option value="2" text="二星达人" />
				<ui-option value="3" text="三星达人" />
				<ui-option value="4" text="四星达人" />
				<ui-option value="5" text="五星达人" />
			</ui-select>
			<ui-number v-model="data.avgQuota" label="DD加权分红"/>
			<ui-number v-model="data.avgAdQuota" label="金豆分润比例"/>
			<ui-template label="操作">
				<ui-button type="edit" @click="edit(data)"/>
				<!-- <ui-button type="delete" :disabled="data.userType==2" @click="remove(data)"/> -->
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
		// add(){
		// 	this.$dialog('app_edition_detail',{type:'add',data:{}},()=>{
		// 		this.$refs.table.refresh();
		// 	})
		// },
		edit(data){
			this.$dialog('dividend_ratio_detail',{type:'edit',data:data},()=>{
				this.$refs.table.refresh();
			})
		},
		// remove(data){
		// 	this.$axios.delete('/admin/appVersion/'+data.id)
		// 	.then(data=>{
		// 		this.$refs.table.refresh();
		// 	}).end();
		// }
	}
}
</script>

<style>
</style>
