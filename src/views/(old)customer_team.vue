<template>
	<div class="com-list-content">
		<com-search :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<el-radio-group :value="tab" @input="tab=$event" @change="tabChange">
				<el-radio-button label="好友"></el-radio-button>
				<el-radio-button label="粉丝"></el-radio-button>
				<el-radio-button label="团队"></el-radio-button>
			</el-radio-group>
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" :url="url+'?accountId='+id" :search="condition" v-slot="{data}" autolimitwidth
		 noautobind>
			<ui-select :value="(data.memberExpireDate&&$moment(data.memberExpireDate).valueOf()>$moment().valueOf())?data.identity:'-1'" label="身份">
				<ui-option value="-1" text="普通会员" />
				<ui-option value="0" text="VIP会员" />
				<ui-option value="1" text="运营商" />
				<ui-option value="2" text="理事" />
				<ui-option value="4" text="合伙人" />
				<ui-option value="5" text="运营商(合伙人)" />
				<ui-option value="6" text="理事(合伙人)" />
			</ui-select>
			<ui-text v-model="data.mobile" label="手机号" value-type="phone" />
			<ui-text v-model="data.nickName" label="昵称" />
			<ui-text v-model="data.realName" label="姓名" />
			<ui-text v-model="data.no" label="身份证号" value-type="idcard" />
			<ui-number v-model="data.coinBalance" label="垒钻数量" />
			<ui-number v-model="data.taskProfit" label="任务收益" />
			<ui-date v-model="data.createTime" label="注册时间" type="datetime" />
			<ui-select v-model="data.isCharge" label="是否充值" tag width="80">
				<ui-option value="0" text="否" tag-type="danger" />
				<ui-option value="1" text="是" tag-type="success" />
			</ui-select>
		</com-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tab: '好友',
				url: '/admin/account/friend',
				search: {},
				condition: {},
				id: '',
			};
		},
		activated() {
			console.log(this.$route.params)
			if (this.$route.params.accountId) {
				this.id = this.$route.params.accountId
			}
		},
		methods: {
			tabChange(label){
				switch (label){
					case '好友':
						this.url = '/admin/account/friend';
						break;
					case '粉丝':
						this.url = '/admin/account/fan';
						break;
					case '团队':
						this.url = '/admin/account/team';
						break;
					default:
						break;
				}
			},
		}
	}
</script>

<style>
</style>
