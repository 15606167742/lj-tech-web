<template>
	<ui-form :model="model" v-slot="{data}" view>
		<ui-number v-model="data.coinAmount" label="垒钻值"/>
		<ui-number v-model="data.coinNum" label="垒钻数量"/>
		<ui-number v-model="data.partnerFund" label="合伙人数据往来"/>
		<ui-number v-model="data.partnerFundOut" label="合伙人已提现"/>
		<ui-number v-model="data.platformFund" label="平台数据往来"/>
		<ui-number v-model="data.platformFundOut" label="平台已提现"/>
		<ui-number v-model="data.vipFund" label="理事数据往来"/>
		<ui-number v-model="data.vipFundOut" label="理事已提现"/>
		<ui-number v-model="data.otherFund" label="其他数据往来"/>
		<ui-number v-model="data.coinFund" label="垒钻值托底DD"/>
	</ui-form>
</template>

<script>
export default {
	data(){
		return {
			model:{}
		};
	},
	mounted() {
		this.getDetail();
	},
	methods:{
		getDetail(){
			this.$axios.request({url:'/admin/fundPool/itomRelease', method: 'get'})
			.then(data=>{
				this.model = data;
			}).end();
		},
	},
}
</script>

<style>
</style>