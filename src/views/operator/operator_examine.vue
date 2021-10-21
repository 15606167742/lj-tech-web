<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.mobile" label="手机号" />
			<ui-select v-model="data.approveType" label="申请类型">
				<ui-option value="1" text="运营商" />
				<ui-option value="2" text="理事" />
			</ui-select>
			<ui-select v-model="data.approveStatus" label="审核状态">
				<ui-option value="0" text="待审核" />
				<ui-option value="1" text="寄送协议" />
				<ui-option value="2" text="审核通过" />
				<ui-option value="-1" text="审核拒绝" />
			</ui-select>
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/operatorApprove" :search="condition" v-slot="{data}" :search-com="$refs.search">
			<ui-image :value="$g(data, 'account.headImg')" label="头像" width="80" />
			<ui-text :value="$g(data, 'account.mobile')" label="手机号" value-type="phone" />
			<ui-text :value="$g(data, 'account.nickName')" label="昵称" />
			<ui-select v-model="data.approveType" label="申请类型">
				<ui-option value="1" text="运营商" />
				<ui-option value="2" text="理事" />
			</ui-select>
			<ui-date v-model="data.createTime" label="创建时间" type="datetime" />
			<ui-select v-model="data.approveStatus" label="审核状态">
				<ui-option value="0" text="待审核" />
				<ui-option value="1" text="寄送协议" />
				<ui-option value="2" text="审核通过" />
				<ui-option value="-1" text="审核拒绝" />
			</ui-select>
			<ui-date v-model="data.approveTime" label="审核时间" type="datetime" />
			<ui-template label="操作" width="450">
				<ui-button icon="el-icon-s-custom" buttonType="primary" @click="team(data)">团队查看</ui-button>
				<ui-button icon="el-icon-tickets" buttonType="primary" @click="sendInfo(data)">寄送信息</ui-button>
				<template v-if="data.approveStatus==0">
					<ui-button icon="el-icon-s-promotion" buttonType="primary" confirm-text="确认是否寄送协议？" @click="send(data)">寄送协议</ui-button>
					<ui-button icon="el-icon-s-claim" buttonType="danger" @click="reject(data)">审核拒绝</ui-button>
				</template>
				<ui-button icon="el-icon-s-claim" buttonType="primary" @click="examine(data)" :disabled="data.approveStatus!=1"
				 v-else>审核</ui-button>
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
			team(data) {
				this.$router.push({
					name: 'operator_team',
					params: {
						data: data,
						page: 'operator_examine'
					}
				});
			},
			sendInfo(data) {
				this.$dialog('operator_sendInfo', {
					data: data
				}, () => {
					this.$refs.table.refresh();
				})
			},
			send(data) {
				this.$axios.request({
						url: '/operatorApprove/' + data.id + '/1',
						method: 'post',
						urlencode: true
					})
					.then(data => {
						this.$refs.table.refresh();
					}).end();
			},
			reject(data) {
				data.reject = true;
				this.$dialog('operator_examine_detail', {
					data: data
				}, () => {
					this.$refs.table.refresh();
				})
			},
			examine(data) {
				this.$dialog('operator_examine_detail', {
					data: data
				}, () => {
					this.$refs.table.refresh();
				})
			},
		}
	}
</script>

<style>
</style>
