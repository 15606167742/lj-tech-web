<template>
	<div class="com-list-content">
		<com-search :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.versionName" label="版本名" />
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="add" @click="add">增加</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/appVersion/listPage" :search="condition" v-slot="{data}">
			<ui-text v-model="data.versionName" label="版本名" />
			<ui-number v-model="data.versionCode" label="版本号"/>
			<ui-select v-model="data.apkType" label="类型" required>
				<ui-option value="1" text="领哆哆"/>
				<ui-option value="2" text="环梦"/>
				<ui-option value="3" text="领哆哆"/>
			</ui-select>
			<ui-attachment v-model="data.url" label="apk" />
			<ui-date v-model="data.createTime" label="创建时间" type="datetime"/>
			<ui-textarea v-model="data.remark" label="备注"/>
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
			this.$dialog('app_edition_detail',{type:'add',data:{}},()=>{
				this.$refs.table.refresh();
			})
		},
		edit(data){
			this.$dialog('app_edition_detail',{type:'edit',data:data},()=>{
				this.$refs.table.refresh();
			})
		},
		remove(data){
			this.$axios.delete('/admin/appVersion/'+data.id)
			.then(data=>{
				this.$refs.table.refresh();
			}).end();
		}
	}
}
</script>

<style>
</style>
