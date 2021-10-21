<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-hidden v-model="data.id" autosubmit/>
		<ui-select v-model="state" label="审核状态" nosubmit required :columns="2">
			<ui-option value="pass" text="通过" />
			<ui-option value="reject" text="拒绝" />
		</ui-select>
		<ui-textarea v-model="data.rejectReason" label="备注" :required="state=='reject'?'':undefined" />
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
			state:'pass',
		};
	},
	mounted() {
	},
	methods:{
		submit(){
			this.$axios.request({url:'/admin/providerRechargeRecord/'+this.state,data:this.submitData,method:'post',urlencode:true})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>