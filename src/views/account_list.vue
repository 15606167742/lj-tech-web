<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.mobile" label="手机号"/>
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="export" @click="exportExcel('user')">导出新注冊用户</ui-button>
				<ui-button type="export" @click="exportExcel('roll')">导出新购买礼包</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/adminAddearings?userFlag=1" :search="condition" v-slot="{data}" :search-com="$refs.search" autolimitwidth>
			<ui-text v-model="data.nickName" label="昵称" :width="150"/>
			<ui-text v-model="data.realName" label="姓名" :width="150"/>
			<ui-text v-model="data.mobile" label="手机号" value-type="phone"/>
			<ui-date v-model="data.createTime" label="注册时间" type="datetime"/>
			<ui-select :value="data.otcLevel" label="达人等级">
				<ui-option value="0" text="普通会员" />
				<ui-option value="1" text="一星达人" />
				<ui-option value="2" text="二星达人" />
				<ui-option value="3" text="三星达人" />
				<ui-option value="4" text="四星达人" />
				<ui-option value="5" text="五星达人" />
			</ui-select>
			<!-- <ui-number v-model="data.directQty" label="直推人数"/>
			<ui-number v-model="data.baseRate" label="个人活跃度"/>
			<ui-number v-model="data.teamQty" label="团队人数"/>
			<ui-number v-model="data.hashRate" label="团队活跃度"/>
			<ui-number v-model="data.protQty" label="小区人数"/>
			<ui-number v-model="data.protHashRate" label="小区活跃度"/> -->
			<!-- <ui-number v-model="data.myCoin" label="DD"/> -->
			<ui-template label="DD">
				<ui-button button-type="primary" @click="point(data)" link>{{data.myCoin}}</ui-button>
			</ui-template>
			<ui-number v-model="data.power" label="能量值"/>
			<ui-template label="操作">
				<!-- <ui-button type="edit" @click="editActivity(data)">修改活跃度</ui-button> -->
				<ui-button @click="editPhone(data)" icon="el-icon-mobile" button-type="primary">修改手机号</ui-button>
				<ui-button type="edit" @click="editPoint(data)">添加DD</ui-button>
				<ui-button type="edit" @click="editPower(data)">添加能量值</ui-button>
				<ui-button type="edit" @click="editVirtualActivity(data)">营销号虚拟活跃度设置</ui-button>
				<ui-button icon="el-icon-refresh" button-type="warning" confirm-text="确定是否重置密码？" @click="resetPassword(data)">重置密码</ui-button>
				<ui-button type="delete" @click="remove(data)" />
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
		exportExcel(type) {
			this.$dialog('account_export', {
				data: {type}
			}, {
				width: '600px'
			}, () => {});
		},
		// editActivity(data){
		// 	this.$dialog('account_activity',{type:'edit',data:data},()=>{
		// 		this.$refs.table.refresh();
		// 	})
		// },
		point(data) {
			data.accountId = data.id;
			this.$router.push({
				name: 'account_point_view',
				params: data
			});
		},
		editPhone(data) {
			this.$dialog('account_phone', {
				type: 'edit',
				data: data
			}, () => {
				this.$refs.table.refresh();
			})
		},
		editPoint(data){
			this.$dialog('account_point',{type:'edit',data:data},()=>{
				this.$refs.table.refresh();
			})
		},
		editPower(data){
			this.$dialog('account_power',{type:'edit',data:data},()=>{
				this.$refs.table.refresh();
			})
		},
		editVirtualActivity(data){
			this.$dialog('account_virtual_activity',{type:'edit',data:data},()=>{
				this.$refs.table.refresh();
			})
		},
		resetPassword(data){
			this.$axios.request({
				url: '/admin/account/resetPassword',
				params: {accountId: data.id},
				method: 'put'
			}).then(d => {
				this.$message({
					type: 'success',
					message: '操作成功!'
				});
				this.$refs.table.refresh();
			}).end();
		},
		remove(data) {
			this.$axios.request({
					url: '/admin/account/removeAccount',
					params: {
						accountId: data.id,
					},
					method: 'post'
				})
				.then(d => {
					this.$refs.table.refresh();
				}).end();
		},
	}
}
</script>

<style>
</style>