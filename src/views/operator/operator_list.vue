<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.mobile" label="手机号" value-type="phone"/>
			<ui-text v-model="data.realName" label="姓名"/>
			<ui-date v-model="data.startTime" label="开始时间" type="datetime" />
			<ui-date v-model="data.endTime" label="结束时间" type="datetime" />
			<ui-select v-model="data.isCharge" label="是否充值" tag>
				<ui-option value="0" text="否" tag-type="danger"/>
				<ui-option value="1" text="是" tag-type="success"/>
			</ui-select>
			<ui-text v-model="data.inviteRealName" label="邀请人姓名"/>
			<ui-text v-model="data.inviteMobile" label="邀请人手机号" value-type="phone"/>
			
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/account/vip" :search="condition" v-slot="{data}" :search-com="$refs.search" autolimitwidth>
			<ui-select :value="(data.memberExpireDate&&$moment(data.memberExpireDate).valueOf()>$moment().valueOf())?data.identity:'-1'" label="身份">
				<ui-option value="-1" text="普通会员" />
				<ui-option value="0" text="VIP会员" />
				<ui-option value="1" text="运营商" />
				<ui-option value="2" text="理事" />
				<ui-option value="4" text="合伙人" />
				<ui-option value="5" text="运营商(合伙人)" />
				<ui-option value="6" text="理事(合伙人)" />
			</ui-select>
			<ui-text v-model="data.mobile" label="手机号" value-type="phone"/>
			<ui-text v-model="data.nickName" label="昵称"/>
			<ui-text v-model="data.realName" label="姓名"/>
			<ui-text v-model="data.no" label="身份证号" value-type="idcard"/>
			<ui-template label="垒钻数量">
				<ui-button buttonType="primary" @click="coinProfit(data)" link>{{data.coinBalance}}</ui-button>
			</ui-template>
			<ui-template label="总收益">
				<ui-button buttonType="primary" @click="profit(data)" link>{{data.taskProfit}}</ui-button>
			</ui-template>
			<ui-date v-model="data.createTime" label="注册时间" type="datetime"/>
			<ui-select v-model="data.isCharge" label="是否充值" tag width="80">
				<ui-option value="0" text="否" tag-type="danger"/>
				<ui-option value="1" text="是" tag-type="success"/>
			</ui-select>
			<ui-select v-model="data.enabled" label="是否启用" tag>
				<ui-option value="0" text="否" tag-type="danger"/>
				<ui-option value="1" text="是" tag-type="success"/>
			</ui-select>
			<ui-text :value="$g(data, 'shareAccount.realName')" label="邀请人姓名"/>
			<ui-text :value="$g(data, 'shareAccount.mobile')" label="邀请人手机号" value-type="phone"/>
			<ui-template label="操作">
				<ui-button icon="el-icon-s-custom" buttonType="primary" @click="team(data)">团队查看</ui-button>
				<!-- <ui-button type="edit" @click="edit(data)"/> -->
				<ui-button @click="disable(data)" icon="el-icon-lock" button-type="info" confirm-text="确定是否禁用吗？" :disabled="data.enabled==0">禁用</ui-button>
				<ui-button icon="el-icon-s-custom" buttonType="primary" @click="agreement(data)">协议查看</ui-button>
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
				params: {data:data,page:'operator_list'}
			});
		},
		disable(data) {
			this.$axios.request({url:'/admin/account/forbidden', params:{accountId: data.id},method: 'post'})
				.then(d => {
					this.$message({
						type: 'success',
						message: '操作成功!'
					});
					this.$refs.table.refresh();
				}).end();
		},
		agreement(data){
			this.$dialog('operator_agreement',{data:data},()=>{
				this.$refs.table.refresh();
			})
		},
		coinProfit(data){
			data.accountId = data.id;
			this.$router.push({
				name: 'operator_coinProfit',
				params: data
			});
		},
		profit(data){
			data.accountId = data.id;
			this.$router.push({
				name: 'operator_profit',
				params: data
			});
		},
	}
}
</script>

<style>
</style>