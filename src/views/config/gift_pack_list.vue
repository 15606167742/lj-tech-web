<template>
	<div class="com-list-content">
		<!-- <com-search :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-template>
				<ui-button type="edit" @click="editUnify">统一修改</ui-button>
			</ui-template>
		</com-search> -->
		<com-table ref="table" url="/admin/CoinMill/getMillList" :search="condition" v-slot="{data}">
			<ui-text v-model="data.millName" label="礼包名称" />
			<ui-number v-model="data.level" label="礼包级别"/>
			<ui-select v-model="data.type" label="礼包类型">
				<ui-option value="0" text="赠送" />
				<ui-option value="1" text="购买" />
			</ui-select>
			<ui-text v-model="data.remark" label="备注" />
			<ui-template label="操作">
				<ui-button type="edit" @click="edit(data)"/>
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
		edit(data){
			this.$dialog('gift_pack_detail',{type:'edit',data:data},()=>{
				this.$refs.table.refresh();
			})
		},
	}
}
</script>

<style>
</style>
