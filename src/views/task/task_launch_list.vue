<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.taskName" label="任务名称"/>
			<ui-select v-model="data.typeId" label="任务分类" url="/admin/taskType" value-field="id" text-field="typeName"/>
			<ui-text v-model="data.enterpriseName" label="任务商名称"/>
			<ui-select v-model="data.noviceTask" label="新手任务">
				<ui-option value="0" text="否" />
				<ui-option value="1" text="是" />
			</ui-select>
			<ui-select v-model="data.launchState" label="投放状态">
				<ui-option value="0" text="未上架" />
				<ui-option value="1" text="上架" />
				<ui-option value="2" text="下架" />
			</ui-select>
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/taskLaunch/listPage" :search="condition" v-slot="{data}" :search-com="$refs.search">
			<ui-text v-model="data.taskName" label="任务名称"/>
			<ui-image v-model="data.taskIcon" label="任务图标" size="mini"/>
			<ui-text v-model="data.typeName" label="任务分类"/>
			<ui-text v-model="data.enterpriseName" label="任务商名称"/>
			<ui-date v-model="data.startTime" label="开始时间" type="datetime"/>
			<ui-date v-model="data.endTime" label="结束时间" type="datetime"/>
			<ui-number v-model="data.launchPrice" label="投放单份DD"/>
			<ui-number v-model="data.launchNum" label="投放数量"/>
			<ui-number v-model="data.enrollNum" label="报名人数"/>
			<ui-number v-model="data.finishNum" label="完成数量"/>
			<ui-number v-model="data.pendingApprovalNum" label="待审核数"/>
			<ui-switch v-model="data.noviceTask" label="新手任务" />
			<ui-template label="任务进度">
				<el-progress :percentage="new Number((data.finishNum/data.launchNum*100).toFixed(0))"></el-progress>
			</ui-template>
			<ui-select v-model="data.launchState" label="投放状态" required>
				<ui-option value="0" text="未上架" />
				<ui-option value="1" text="上架" />
				<ui-option value="2" text="下架" />
			</ui-select>
			<ui-template label="操作">
				<ui-button type="view" @click="detail(data)">任务详情</ui-button>
				<ui-button type="view" @click="comList(data)">完成详情</ui-button>
				<ui-button type="delete" @click="down(data)" confirm-text="确定是否下架吗？" :disabled="data.launchState!=1">下架任务</ui-button>
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
		detail(data){
			this.$dialog('task_launch_detail',{data:data},()=>{
				this.$refs.table.refresh();
			})
		},
		comList(data){
			this.$router.push({
				name: 'task_launch_comList',
				params: data
			});
		},
		down(data){
			this.$axios.request({url:'/admin/taskLaunch/offShelf',data:{id: data.id},method:'put',urlencode:true})
			.then(data=>{
				this.$refs.table.refresh();
			}).end();
		}
	}
}
</script>

<style>
</style>