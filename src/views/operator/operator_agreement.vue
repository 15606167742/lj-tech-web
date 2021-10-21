<template>
	<ui-form :model="model" v-slot="{data}">
		<ui-image :value="data.agreement" label="协议查看" multiple view/>
	</ui-form>
</template>

<script>
export default {
	props:['params','close'],
	data(){
		return {
			model:{}
		};
	},
	mounted() {
		this.getAgreement();
	},
	methods:{
		getAgreement(){
			this.$axios.request({url:'/admin/account/agreement', params:{accountId: this.params.data.id},method: 'post'})
			.then(data=>{
				this.model.agreement = data;
			}).end();
		},
	},
}
</script>

<style>
</style>