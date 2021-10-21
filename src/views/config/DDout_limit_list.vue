<template>
	<div class="com-list-content">
		<com-search :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-template>
				<ui-button type="add" @click="add">增加</ui-button>
				<ui-button type="edit" @click="editSwitch">配置开关</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/limitConfig/getList" :search="condition" v-slot="{data}">
			<ui-number v-model="data.millLevel" label="礼包等级"/>
			<ui-number v-model="data.upperLimit" label="额度"/>
			<ui-date v-model="data.createTime" label="创建时间" type="datetime" />
			<ui-date v-model="data.updateTime" label="修改时间" type="datetime" />
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
	mounted() {},
	methods:{
		add(){
			this.$dialog('DDout_limit_detail',{type:'add',data:{}},()=>{
				this.$refs.table.refresh();
			})
		},
		edit(data){
			this.$dialog('DDout_limit_detail',{type:'edit',data:data},()=>{
				this.$refs.table.refresh();
			})
		},
		remove(data){
			this.$axios.delete('/admin/limitConfig/udeleteLimit?id='+data.id)
			.then(data=>{
				this.$refs.table.refresh();
			}).end();
		},
		editSwitch(){
			this.$dialog('DDout_switch_setting',{type:'edit',data:{}},()=>{
				this.$refs.table.refresh();
			})
		},
	}
}
</script>

<style>
</style>
