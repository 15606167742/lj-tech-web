<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.realName" label="姓名" />
			<ui-text v-model="data.mobile" label="手机号" />
			<ui-text v-model="data.ip" label="ip" v-if="isAdmin"/>
			<ui-date v-model="data.startTime" label="注册开始时间" type="datetime" />
			<ui-date v-model="data.endTime" label="注册结束时间" type="datetime" />
			<ui-select v-model="data.otcLevel" label="达人等级">
				<ui-option value="0" text="普通会员" />
				<ui-option value="1" text="一星达人" />
				<ui-option value="2" text="二星达人" />
				<ui-option value="3" text="三星达人" />
				<ui-option value="4" text="四星达人" />
				<ui-option value="5" text="五星达人" />
			</ui-select>
			<ui-select v-model="data.mSort" label="MLDD排序">
				<ui-option value="1" text="升序" />
				<ui-option value="2" text="降序" />
			</ui-select>
			<ui-select v-model="data.zSort" label="ZLDD排序">
				<ui-option value="1" text="升序" />
				<ui-option value="2" text="降序" />
			</ui-select>
			<ui-select v-model="data.enabled" label="是否封号" v-if="isAdmin">
				<ui-option value="0" text="是" />
				<ui-option value="1" text="否" />
			</ui-select>
			<!-- <ui-select v-model="data.isUseful" label="是否为有效用户">
				<ui-option value="0" text="否" />
				<ui-option value="1" text="是" />
			</ui-select> -->
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="add" @click="add">增加</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/account?userFlag=1" :search="condition" v-slot="{data}"
			:search-com="$refs.search" :dataFormat="dataFormat" autolimitwidth>
			<!-- <ui-text v-model="data.nickName" label="昵称" :width="150" /> -->
			<ui-text v-model="data.realName" label="姓名" :width="150" />
			<ui-text v-model="data.mobile" label="手机号" value-type="phone" />
			<ui-text v-model="data.ip" label="ip" :width="150" v-if="isAdmin"/>
			<!-- <ui-text v-model="data.no" label="身份证号" value-type="idcard"/> -->
			<ui-date v-model="data.createTime" label="注册时间" type="datetime" />
			<ui-date v-model="data.authTime" label="实名认证时间" type="datetime" />
			<ui-select :value="data.otcLevel" label="达人等级">
				<ui-option value="0" text="普通会员" />
				<ui-option value="1" text="一星达人" />
				<ui-option value="2" text="二星达人" />
				<ui-option value="3" text="三星达人" />
				<ui-option value="4" text="四星达人" />
				<ui-option value="5" text="五星达人" />
			</ui-select>
			<ui-number v-model="data.directQty" label="直推人数" />
			<ui-number v-model="data.baseRate" label="个人活跃度" />
			<ui-number v-model="data.hashRate" label="团队活跃度" />
			<ui-number v-model="data.protHashRate" label="小区活跃度" />
			<ui-number v-model="data.reginRate" label="大区活跃度" />
			<!-- <ui-template label="MLDD" v-if="isAdmin">
				<ui-button button-type="primary" @click="point(data, 1)" link>{{data.mldd?data.mldd:0}}</ui-button>
			</ui-template> -->
			<ui-number v-model="data.mldd" label="MLDD" />
			<!-- <ui-template label="ZLDD" v-if="isAdmin">
				<ui-button button-type="primary" @click="point(data, 2)" link>{{data.zldd?data.zldd:0}}</ui-button>
			</ui-template> -->
			<ui-number v-model="data.zldd" label="ZLDD" />
			<ui-template label="DD" v-if="isClientAdmin">
				<ui-button button-type="primary" @click="pointDD(data)" link>{{data.myCoin}}</ui-button>
			</ui-template>
			<ui-template label="能量值" v-if="isAdmin">
				<ui-button button-type="primary" @click="power(data)" link>{{data.power}}</ui-button>
			</ui-template>
			<ui-number v-model="data.power" label="能量值" v-else />
			<ui-template label="有效礼包" v-if="isAdmin">
				<ui-button button-type="primary" @click="reel(data)" link>{{data.millCount}}</ui-button>
			</ui-template>
			<ui-number v-model="data.millCount" label="有效礼包" v-else />
			<ui-template label="金豆数" v-if="isAdmin">
				<ui-button button-type="primary" @click="bean(data)" link>{{data.toReleaseAmount}}</ui-button>
			</ui-template>
			<ui-number v-model="data.toReleaseAmount" label="金豆数" v-else />
			<ui-template label="现金余额" v-if="isAdmin">
				<ui-button button-type="primary" @click="balance(data)" link>{{data.taskProfit}}</ui-button>
			</ui-template>
			<ui-number v-model="data.taskProfit" label="现金余额" v-else />
			<ui-text v-model="data.makeupRate" label="加成卡加成比例" />
			<ui-select v-model="data.stopEditFlag" label="是否禁止编辑" tag width="120">
				<ui-option value="0" text="否" tag-type="info" />
				<ui-option value="1" text="是" tag-type="primary" />
			</ui-select>
			<ui-select v-model="data.authentication" label="是否为有效用户" tag width="120">
				<ui-option value="0" text="否" tag-type="info" />
				<ui-option value="1" text="是" tag-type="primary" />
			</ui-select>
			<ui-select v-model="data.enabled" label="是否封号" tag width="120">
				<ui-option value="0" text="是" tag-type="info" />
				<ui-option value="1" text="否" tag-type="primary" />
			</ui-select>
			<ui-textarea v-model="data.comment" label="备注" />
			<ui-textarea v-model="data.remark" label="封号原因" />
			<ui-template label="操作">
				<!-- <ui-button type="edit" @click="edit(data)"/> -->
				<ui-button icon="el-icon-s-custom" buttonType="primary" @click="team(data)">好友列表</ui-button>
				<ui-button icon="el-icon-data-line" buttonType="primary" @click="dailyData(data)">查看每日数据</ui-button>
				<ui-button @click="enableEdit(data)" icon="el-icon-edit-outline" button-type="primary"
					confirm-text="确认是否允许用户进行信息编辑？" :disabled="data.stopEdit==0||(data.isAllowEdit==0&&!isAdmin)">编辑权限释放</ui-button>
				<ui-button @click="editTip(data)" type="edit">备注</ui-button>
				<ui-button @click="disable(data)" icon="el-icon-lock" button-type="info" :disabled="data.isFreeze==0&&!isAdmin" v-if="data.enabled==1">封号
				</ui-button>
				<ui-button @click="enable(data)" icon="el-icon-unlock" button-type="primary" confirm-text="确定是否解封？"
					v-else>解封</ui-button>
				<ui-button @click="editPhone(data)" icon="el-icon-mobile" button-type="primary" v-if="isClientAdmin">修改手机号</ui-button>
				<ui-button icon="el-icon-refresh" button-type="warning" confirm-text="确定是否重置密码？" @click="resetPassword(data)" :disabled="data.isResetPassword==0&&!isAdmin" v-if="isClientAdmin">重置密码</ui-button>
				<ui-button type="delete" @click="remove(data)" v-if="isClientAdmin" />
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
				isAdmin: this.$store.state.app.user.userType==1||this.$store.state.app.user.userType==2,
				isClientAdmin: this.$store.state.app.user.username=='admin',
			};
		},
		mounted() {
			console.log(this.$store.state.app.user)
		},
		methods: {
			dataFormat(data) {
				data.forEach(item => {
					if (item.stopEdit) {
						item.stopEditFlag = '1';
					} else {
						item.stopEditFlag = '0';
					}
				})
				return data;
			},
			team(data) {
				data.accountId = data.id;
				this.$router.push({
					name: 'customer_team',
					params: {
						data: data,
						page: 'customer_list'
					}
				});
				// this.$router.push({
				// 	name: 'operator_team',
				// 	params: {data:data,page:'customer_list'}
				// });
			},
			dailyData(data) {
				data.accountId = data.id;
				this.$router.push({
					name: 'customer_dailyData',
					params: {
						data: data,
					}
				});
			},
			add() {
				this.$dialog('customer_add', {
					type: 'add',
					data: {}
				}, () => {
					this.$refs.table.refresh(true);
				})
			},
			// edit(data){
			// 	this.$dialog('customer_detail',{type:'edit',data:data},()=>{
			// 		this.$refs.table.refresh();
			// 	})
			// },
			enableEdit(data) {
				this.$axios.request({
						url: '/admin/account/editableAccount',
						params: {
							accountId: data.id
						},
						method: 'post'
					})
					.then(d => {
						this.$message({
							type: 'success',
							message: '操作成功!'
						});
						this.$refs.table.refresh();
					}).end();
			},
			editTip(data) {
				this.$dialog('customer_tip', {
					data
				}, () => {
					this.$refs.table.refresh();
				});
			},
			disable(data) {
				this.$dialog('customer_disable', {
					data
				}, () => {
					this.$refs.table.refresh();
				});
			},
			enable(data) {
				this.$axios.request({
						url: '/admin/account/forbidden',
						params: {
							accountId: data.id,
							operation: 1
						},
						method: 'post'
					})
					.then(d => {
						this.$message({
							type: 'success',
							message: '操作成功!'
						});
						this.$refs.table.refresh();
					}).end();
			},
			editPhone(data) {
				this.$dialog('account_phone', {
					type: 'edit',
					data: data
				}, () => {
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
			point(data, changeData) {
				data.accountId = data.id;
				data.changeData = changeData;
				this.$router.push({
					name: 'customer_point',
					params: data
				});
			},
			pointDD(data) {
				data.accountId = data.id;
				this.$router.push({
					name: 'account_point_view',
					params: data
				});
			},
			power(data) {
				data.accountId = data.id;
				this.$router.push({
					name: 'customer_power',
					params: data
				});
			},
			reel(data) {
				data.accountId = data.id;
				this.$router.push({
					name: 'customer_reel',
					params: data
				});
			},
			bean(data) {
				data.accountId = data.id;
				this.$router.push({
					name: 'customer_bean',
					params: data
				});
			},
			balance(data) {
				data.accountId = data.id;
				this.$router.push({
					name: 'customer_balance',
					params: data
				});
			},
			// coinProfit(data){
			// 	data.accountId = data.id;
			// 	this.$router.push({
			// 		name: 'customer_coinProfit',
			// 		params: data
			// 	});
			// },
			// profit(data, changeTypes){
			// 	data.accountId = data.id;
			// 	data.changeTypes = changeTypes;
			// 	this.$router.push({
			// 		name: 'customer_profit',
			// 		params: data
			// 	});
			// },
		}
	}
</script>

<style>
</style>
