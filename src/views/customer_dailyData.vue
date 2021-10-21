<template>
	<ui-form :model="info" :transfer-model.sync="submitData" :columns="1" v-slot="{data}" view>
		<ui-number v-model="data.taskProfit" label="任务收益" :precision="3" />
		<ui-number v-model="data.parentProfit" label="推广收益" :precision="3" />
		<ui-number v-model="data.vipDivide" label="分红收益" :precision="3" />
	</ui-form>
</template>

<script>
export default {
	props:['params','close'],
	data(){
		return {
			info:{},
			submitData:{}
		};
	},
	activated() {
		this.getInfo();
	},
	methods:{
		getInfo(){
			this.$axios.get('/admin/account/getDDQuantity?accountId='+this.$route.params.data.accountId).then(data=>{
				this.info = data;
			})
		},
	},
}
</script>

<style>
</style>