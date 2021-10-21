<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-select v-model="data.difficulty" label="难度" url="/enum/listDifficulty" value-field="value" text-field="desc"/>
			<ui-text v-model="data.typeName" label="分类名称"/>
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="add" @click="add">增加</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/taskType/listPage" :search="condition" v-slot="{data}" :search-com="$refs.search">
			<ui-image v-model="data.typeIcon" label="领哆哆分类图标" width="120"/>
			<ui-image v-model="data.typeIconHk" label="海客分类图标" width="120"/>
			<ui-text v-model="data.difficultyDesc" label="难度"/>
			<ui-text v-model="data.typeName" label="分类名称"/>
			<ui-number v-model="data.sort" label="分类排序"/>
			<ui-text v-model="data.profitSection" label="任务DD区间"/>
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
			this.$dialog('task_type_detail',{type:'add',data:{}},()=>{
				this.$refs.table.refresh(true);
			})
		},
		edit(data){
			this.$dialog('task_type_detail',{type:'edit',data:data},()=>{
				this.$refs.table.refresh();
			})
		},
		remove(data){
			this.$axios.delete('/admin/taskType/'+data.id)
			.then(data=>{
				this.$refs.table.refresh();
			}).end();
		}
	}
}
</script>

<style>
</style>