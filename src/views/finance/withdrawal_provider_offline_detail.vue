<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-select v-model="data.accountId" label="企业名" url="/admin/taskProvider?enable=0" value-field="id" text-field="enterpriseName" required/>
		<ui-number v-model="data.amount" label="DD" :precision="2" required/>
		<ui-text v-model="data.paymentNo" label="流水号"/>
		<ui-image v-model="data.screenshot" label="截图"/>
		<ui-template>
			<ui-button type="submit" @submit="submit"></ui-button>
		</ui-template>
	</ui-form>
</template>

<script>
export default {
	props:['params','close'],
	data(){
		return {
			submitData:{},
		};
	},
	mounted() {
	},
	methods:{
		submit(){
			this.$axios.request({url:'/admin/cashOut/offlineProviderCashoutProfit',data:this.submitData,method:'post',urlencode:true})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>