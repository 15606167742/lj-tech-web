<template>
	<div class="com-list-content">
		<com-search :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-template>
				<!-- <ui-button type="search"></ui-button> -->
				<ui-button type="edit" @click="editUnify">统一修改</ui-button>
				<!-- <ui-button type="add" @click="add">增加</ui-button> -->
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/vipUpgrade/queryVipUpgrade" :search="condition" v-slot="{data}">
			<ui-select v-model="data.level" label="用户级别">
				<ui-option value="1" text="一星达人" />
				<ui-option value="2" text="二星达人" />
				<ui-option value="3" text="三星达人" />
				<ui-option value="4" text="四星达人" />
				<ui-option value="5" text="五星达人" />
			</ui-select>
			<ui-number v-model="data.subordinateVip" label="直推人数"/>
			<ui-number v-model="data.subordinateMillQty" label="直推持有礼包人数"/>
			<ui-number v-model="data.subordinateLevel" label="直推持有礼包等级"/>
			<ui-number v-model="data.subordinateAlg" label="总活跃度"/>
			<ui-number v-model="data.subordinatePartHashrate" label="小区活跃度"/>
			<ui-number v-model="data.avgQuota" label="DD加权分红"/>
			<ui-number v-model="data.avgAdQuota" label="金豆分润比例"/>
			<ui-number v-model="data.millLevel" label="奖励礼包等级"/>
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
		editUnify(){
			this.$dialog('star_setting_unify',{type:'edit',data:{}},()=>{
				this.$refs.table.refresh();
			})
		},
		edit(data){
			this.$dialog('star_setting_detail',{type:'edit',data:data},()=>{
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
