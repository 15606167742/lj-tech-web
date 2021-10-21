<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<!-- <el-radio-group :value="tab" @input="tab=$event" @change="tabChange">
				<el-radio-button label="好友"></el-radio-button>
				<el-radio-button label="粉丝"></el-radio-button>
				<el-radio-button label="团队"></el-radio-button>
			</el-radio-group> -->
			<ui-text v-model="data.mobile" label="手机号" value-type="phone" />
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" :url="url+'?accountId='+id" :search="condition" v-slot="{data}" :search-com="$refs.search" :dataFormat="dataFormat" autolimitwidth
		 noautobind>
			<!-- <ui-text v-model="data.nickName" label="昵称" :width="150"/> -->
			<ui-text v-model="data.realName" label="姓名" :width="150"/>
			<ui-text v-model="data.mobile" label="手机号" value-type="phone"/>
			<!-- <ui-text v-model="data.no" label="身份证号" value-type="idcard"/> -->
			<ui-date v-model="data.createTime" label="注册时间" type="datetime"/>
			<ui-select :value="data.otcLevel" label="达人等级">
				<ui-option value="0" text="普通会员" />
				<ui-option value="1" text="一星达人" />
				<ui-option value="2" text="二星达人" />
				<ui-option value="3" text="三星达人" />
				<ui-option value="4" text="四星达人" />
				<ui-option value="5" text="五星达人" />
			</ui-select>
			<ui-number v-model="data.directQty" label="直推人数"/>
			<ui-number v-model="data.baseRate" label="个人活跃度"/>
			<ui-number v-model="data.hashRate" label="团队活跃度"/>
			<ui-number v-model="data.protHashRate" label="小区活跃度"/>
			<ui-number v-model="data.reginRate" label="大区活跃度"/>
			<!-- <ui-number v-model="data.myCoin" label="DD"/> -->
			<ui-number v-model="data.power" label="能量值"/>
			<ui-number v-model="data.millCount" label="有效礼包"/>
			<ui-select v-model="data.stopEditFlag" label="是否禁止编辑" tag width="120">
				<ui-option value="0" text="否" tag-type="info"/>
				<ui-option value="1" text="是" tag-type="primary"/>
			</ui-select>
			<ui-select v-model="data.authentication" label="是否为有效用户" tag width="120">
				<ui-option value="0" text="否" tag-type="info"/>
				<ui-option value="1" text="是" tag-type="primary"/>
			</ui-select>
			<ui-select v-model="data.enabled" label="是否封号" tag width="120">
				<ui-option value="0" text="是" tag-type="info"/>
				<ui-option value="1" text="否" tag-type="primary"/>
			</ui-select>
			<ui-textarea v-model="data.remark" label="封号原因" />
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
			if (this.$route.params.data.accountId) {
				this.id = this.$route.params.data.accountId
				this.page = this.$route.params.page
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
			dataFormat(data){
				data.forEach(item=>{
					if(item.stopEdit){
						item.stopEditFlag = '1';
					}else{
						item.stopEditFlag = '0';
					}
				})
				return data;
			},
		}
	}
</script>

<style>
</style>
