<template>
	<div class="com-list-content">
		<com-table ref="table" :url="'/admin/lucky-purchase-number/winner-list?activityId='+params.data.id" :search="condition" v-slot="{data}"
			:search-com="$refs.search" row-key="accountId" :dataFormat="dataFormat" style="height: 500px;" autolimitwidth>
			<ui-text v-model="data.mobile" label="手机号" />
			<ui-text v-model="data.number" label="号码" />
		</com-table>
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
