<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<!-- <ui-select v-model="data.userFlag" label="用户来源">
				<ui-option value="1" text="领哆哆用户" />
				<ui-option value="2" text="海客用户" />
			</ui-select> -->
			<ui-select v-model="data.identity" label="身份">
				<ui-option value="-1" text="普通会员" />
				<ui-option value="0" text="VIP会员" />
				<ui-option value="1" text="运营商" />
				<ui-option value="2" text="理事" />
				<ui-option value="4" text="合伙人" />
			</ui-select>
			<ui-text v-model="data.mobile" label="手机号" value-type="phone"/>
			<ui-text v-model="data.realName" label="姓名"/>
			<ui-date v-model="data.startTime" label="注册开始时间" type="datetime" />
			<ui-date v-model="data.endTime" label="注册结束时间" type="datetime" />
			<ui-select v-model="data.isCharge" label="是否充值" tag>
				<ui-option value="0" text="否" tag-type="danger"/>
				<ui-option value="1" text="是" tag-type="success"/>
			</ui-select>
			<ui-date v-model="data.payStartTime" label="充值开始时间" />
			<ui-date v-model="data.payEndTime" label="充值结束时间" />
			<ui-select v-model="data.enabled" label="是否启用">
				<ui-option value="0" text="否" />
				<ui-option value="1" text="是" />
			</ui-select>
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/account?userFlag=1" :search="condition" v-slot="{data}" :search-com="$refs.search" autolimitwidth>
			<ui-select v-model="data.userFlag" label="用户来源">
				<ui-option value="1" text="领哆哆用户" />
				<ui-option value="2" text="海客用户" />
			</ui-select>
			<ui-select :value="(data.memberExpireDate&&$moment(data.memberExpireDate).valueOf()>$moment().valueOf())?data.identity:'-1'" label="身份">
				<ui-option value="-1" text="普通会员" />
				<ui-option value="0" text="VIP会员" />
				<ui-option value="1" text="运营商" />
				<ui-option value="2" text="理事" />
				<ui-option value="4" text="合伙人" />
				<ui-option value="5" text="运营商(合伙人)" />
				<ui-option value="6" text="理事(合伙人)" />
			</ui-select>
			<ui-text :value="data.tlLevel?'V'+data.tlLevel:''" label="vip等级" />
			<ui-text v-model="data.mobile" label="手机号" value-type="phone"/>
			<ui-text v-model="data.nickName" label="昵称"/>
			<ui-text v-model="data.realName" label="姓名"/>
			<ui-text v-model="data.no" label="身份证号" value-type="idcard"/>
			<ui-template label="垒钻数量">
				<ui-button button-type="primary" @click="coinProfit(data)" link>{{data.coinBalance}}</ui-button>
			</ui-template>
			<ui-template label="线上收益">
				<ui-button button-type="primary" @click="profit(data, '1,2,3,4,10,11,12,16,17,18')" link>{{(parseFloat(data.serviceProfit)+parseFloat(data.taskProfit)).toFixed(2)}}</ui-button>
			</ui-template>
			<ui-template label="线下收益">
				<ui-button button-type="primary" @click="profit(data, '5,7,15')" link>{{data.serviceOfflineProfit}}</ui-button>
			</ui-template>
			<ui-date v-model="data.createTime" label="注册时间" type="datetime"/>
			<ui-select v-model="data.isCharge" label="是否充值" tag width="80">
				<ui-option value="0" text="否" tag-type="danger"/>
				<ui-option value="1" text="是" tag-type="success"/>
			</ui-select>
			<ui-date v-model="data.payTime" label="充值时间" type="datetime"/>
			<ui-select v-model="data.enabled" label="是否启用" tag width="80">
				<ui-option value="0" text="否" tag-type="danger"/>
				<ui-option value="1" text="是" tag-type="success"/>
			</ui-select>
			<ui-select v-model="data.updateOperator" label="是否可升级运营商">
				<ui-option value="0" text="否" />
				<ui-option value="1" text="是" />
				<ui-option value="2" text="已升级" />
			</ui-select>
			<ui-select v-model="data.updateVipOperator" label="是否可升级理事">
				<ui-option value="0" text="否" />
				<ui-option value="1" text="是" />
				<ui-option value="2" text="已升级" />
			</ui-select>
			<ui-text :value="$g(data, 'shareAccount.mobile')" label="邀请人手机号" value-type="phone"/>
			<ui-template label="操作">
				<ui-button icon="el-icon-s-custom" buttonType="primary" @click="team(data)">团队查看</ui-button>
				<ui-button icon="el-icon-s-check" buttonType="primary" @click="partner(data)" confirm-text="确定是否邀请成为合伙人？">邀请成为合伙人</ui-button>
				<!-- <ui-button type="edit" @click="edit(data)"/> -->
				<ui-button @click="disable(data)" icon="el-icon-lock" button-type="info" confirm-text="确定是否封号？" v-if="data.enabled==1">封号</ui-button>
				<ui-button @click="enable(data)" icon="el-icon-unlock" button-type="primary" confirm-text="确定是否解封？" v-else>解封</ui-button>
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
		// edit(data){
		// 	this.$dialog('task_detail',{type:'edit',data:data},()=>{
		// 		this.$refs.table.refresh();
		// 	})
		// },
		team(data){
			data.accountId = data.id;
			this.$router.push({
				name: 'operator_team',
				params: {data:data,page:'customer_list'}
			});
		},
		partner(data) {
			this.$axios.request({url:'/admin/account/partner', params:{accountId: data.id},method: 'post'})
				.then(d => {
					this.$message({
						type: 'success',
						message: '操作成功!'
					});
					this.$refs.table.refresh();
				}).end();
		},
		disable(data) {
			this.$axios.request({url:'/admin/account/forbidden', params:{accountId: data.id, operation: 0},method: 'post'})
				.then(d => {
					this.$message({
						type: 'success',
						message: '操作成功!'
					});
					this.$refs.table.refresh();
				}).end();
		},
		enable(data) {
			this.$axios.request({url:'/admin/account/forbidden', params:{accountId: data.id, operation: 1},method: 'post'})
				.then(d => {
					this.$message({
						type: 'success',
						message: '操作成功!'
					});
					this.$refs.table.refresh();
				}).end();
		},
		coinProfit(data){
			data.accountId = data.id;
			this.$router.push({
				name: 'customer_coinProfit',
				params: data
			});
		},
		profit(data, changeTypes){
			data.accountId = data.id;
			data.changeTypes = changeTypes;
			this.$router.push({
				name: 'customer_profit',
				params: data
			});
		},
	}
}
</script>

<style>
</style>