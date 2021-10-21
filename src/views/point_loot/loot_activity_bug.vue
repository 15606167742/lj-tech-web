<template>
	<div class="com-list-content">
		<ui-form>
			<ui-textarea :value="numberList.join(',')" label="中奖号码" view/>
			<ui-number :value="numberList.length" label="中奖号码数量" view/>
			<ui-number :value="params.data.goodsCount" label="商品数量" view/>
		</ui-form>
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.mobile" label="手机号" />
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" :url="'/admin/lucky-purchase-number/joiner-list?activityId='+params.data.id" :search="condition" v-slot="{data}"
			:search-com="$refs.search" row-key="accountId" :dataFormat="dataFormat" style="height: 500px;" autolimitwidth>
			<ui-text v-model="data.mobile" label="手机号" />
			<ui-text v-model="data.number" label="号码" />
			<ui-template label="操作">
				<ui-button button-type="primary" icon="el-icon-circle-check" @click="add(data)" :disabled="!data.number">选择中奖</ui-button>
				<ui-button button-type="danger" icon="el-icon-circle-close" @click="remove(data)" :disabled="!data.number">取消中奖</ui-button>
			</ui-template>
		</com-table>
		<ui-button button-type="primary" icon="el-icon-check" style="width: 200px;align-self: flex-end;margin-top: 20px;" @click="check">确定</ui-button>
	</div>
</template>

<script>
	export default {
		props: ['params', 'close'],
		data() {
			return {
				search: {},
				condition: {},
				numberList: [],
			};
		},
		// mounted() {
		// 	if(this.params.data&&this.params.data.winningNumber){
		// 		this.numberList.push(...this.params.data.winningNumber.split(','));
		// 	}
		// },
		methods: {
			dataFormat(data) {
				data.forEach(account => {
					account.children = account.numberList.map(number => {
						return {
							accountId: account.accountId + number,
							number
						}
					})
				})
				return data
			},
			add(data) {
				if(this.numberList.length >= this.params.data.goodsCount){
					return
				}
				let set = new Set(this.numberList);
				set.add(data.number);
				this.numberList = Array.from(set)
			},
			remove(data) {
				let set = new Set(this.numberList);
				set.delete(data.number);
				this.numberList = Array.from(set)
			},
			check() {
				if (this.numberList.length != this.params.data.goodsCount) {
					this.$msgbox('中奖号码数量必须和商品数量一致');
					return;
				}
				this.$axios.request({url:'/admin/lucky-purchase-activity/designate',data:{activityId:this.params.data.id,winningNumbers:this.numberList.join(',')},method:'put',urlencode:true})
				.then(data=>{
					this.close();
				}).end();
			}
		}
	}
</script>

<style>
</style>
