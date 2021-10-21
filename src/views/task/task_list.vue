<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-select v-model="data.typeId" label="任务分类" url="/admin/taskType" value-field="id" text-field="typeName"/>
			<ui-text v-model="data.enterpriseName" label="任务商名称"/>
			<ui-text v-model="data.taskName" label="任务名称"/>
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/task/listPage" :search="condition" v-slot="{data}" :search-com="$refs.search">
			<ui-text v-model="data.typeName" label="任务分类"/>
			<ui-text v-model="data.enterpriseName" label="任务商名称"/>
			<ui-text v-model="data.taskName" label="任务名称"/>
			<ui-switch v-model="data.needIntroduction" label="是否需要攻略"/>
			<ui-text :value="data.introductionVideo?'已上传':'未上传'" label="攻略状态"/>
			<ui-date v-model="data.createTime" label="创建时间" type="datetime"/>
			<ui-template label="操作">
				<ui-button type="edit" @click="edit(data)">编辑</ui-button>
				<ui-button type="view" @click="detail(data)">详情</ui-button>
				<ui-button type="edit" @click="upload(data)" :disabled="data.needIntroduction==0">上传攻略</ui-button>
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
		edit(data){
			this.$dialog('task_edit',{type:'edit',data:data},()=>{
				this.$refs.table.refresh();
			})
		},
		detail(data){
			this.$dialog('task_detail',{data:data},()=>{
				this.$refs.table.refresh();
			})
		},
		upload(data){
			this.$dialog('task_video',{type:'edit',data:data},()=>{
				this.$refs.table.refresh();
			})
		},
	}
}
</script>

<style>
</style>