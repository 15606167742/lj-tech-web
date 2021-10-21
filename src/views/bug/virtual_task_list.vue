<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.mobile" label="手机号" />
			<ui-text v-model="data.inviteMobile" label="邀请人手机号" />
			<ui-select v-model="data.earningToday" label="是否完成任务">
				<ui-option value="0" text="否" />
				<ui-option value="1" text="是" />
			</ui-select>
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="add" @click="add">转换为虚拟用户</ui-button>
				<ui-button icon="el-icon-finished" button-type="primary" confirm-text="确定是否执行批量完成任务吗？" @click="finish">批量完成任务</ui-button>
				<ui-button icon="el-icon-view" button-type="info" @click="view">查看任务完成进度</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/account/virtualAccountPage" :search="condition" v-slot="{data}"
			:search-com="$refs.search" autolimitwidth>
			<!-- <ui-text v-model="data.nickName" label="昵称" /> -->
			<ui-text v-model="data.mobile" label="手机号" value-type="phone" />
			<ui-number v-model="data.coinSum" label="DD" />
			<ui-number v-model="data.powers" label="能量值" />
			<ui-number v-model="data.millCount" label="有效礼包" />
			<ui-switch :value="data.earningToday>0" label="是否完成任务" />
			<ui-date v-model="data.createTime" label="注册时间" type="datetime" />
			<ui-text v-model="data.inviteMobile" label="邀请人手机号" value-type="phone" />
		</com-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				search: {},
				condition: {},
			};
		},
		mounted() {},
		methods: {
			add() {
				this.$dialog('virtual_task_add', {
					type: 'add',
					data: {}
				}, () => {
					this.$refs.table.refresh(true);
				})
			},
			finish() {
				this.$axios.post('/admin/account/virtualAccountTask')
					.then(d => {
						this.$message({
							type: 'success',
							message: '执行批量完成任务!'
						});
					}).end();
			},
			view() {
				this.$dialog('virtual_task_progress', {
					type: 'view',
					data: {}
				}, () => {
					this.$refs.table.refresh();
				})
			},
		}
	}
</script>

<style>
</style>
