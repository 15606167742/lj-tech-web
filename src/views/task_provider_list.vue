<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.enterpriseName" label="企业名称" />
			<ui-select v-model="data.enable" label="是否禁用" url="/enum/listWhetherToDisable" value-field="value" text-field="desc" />
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="add" @click="add">增加</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/taskProvider/listPage" :search="condition" v-slot="{data}" :search-com="$refs.search">
			<ui-text v-model="data.enterpriseName" label="企业名称" />
			<ui-text v-model="data.contacts" label="联系人" />
			<ui-text v-model="data.no" label="身份证号" value-type="idcard" />
			<ui-text v-model="data.phone" label="联系电话" value-type="phone" />
			<ui-text v-model="data.address" label="地址" />
			<ui-text v-model="data.username" label="登录名" />
			<ui-number v-model="data.serviceProfit" label="分润收益" />
			<ui-number v-model="data.balance" label="余额" />
			<!-- <ui-number v-model="data.coinBalance" label="垒钻数量" /> -->
			<ui-select v-model="data.enable" label="是否禁用" tag>
				<ui-option value="0" text="否" tag-type="success"/>
				<ui-option value="1" text="是" tag-type="danger"/>
			</ui-select>
			<ui-template label="操作">
				<ui-button type="edit" @click="edit(data)" :disabled="data.enable==1" />
				<ui-button @click="disable(data)" icon="el-icon-lock" button-type="info" confirm-text="确定是否禁用吗？" :disabled="data.enable==1">禁用</ui-button>
			</ui-template>
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
				this.$dialog('task_provider_detail', {
					type: 'add',
					data: {}
				}, () => {
					this.$refs.table.refresh(true);
				})
			},
			edit(data) {
				this.$dialog('task_provider_detail', {
					type: 'edit',
					data: data
				}, () => {
					this.$refs.table.refresh();
				})
			},
			disable(data) {
				this.$axios.put('/admin/taskProvider/' + data.id)
					.then(d => {
						this.$message({
							type: 'success',
							message: '操作成功!'
						});
						this.$refs.table.refresh();
					}).end();
			},
		}
	}
</script>

<style>
</style>
