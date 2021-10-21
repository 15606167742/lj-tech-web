<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-text v-model="data.phone" label="手机号" value-type="phone" required />
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
			submitData:{}
		};
	},
	mounted() {},
	methods:{
		submit(){
			this.$axios.request({url:'/admin/account/toVirtualAccount',data:this.submitData,method:'put',urlencode:true})
			.then(data=>{
				this.$message({
					type: 'success',
					message: '操作成功!'
				});
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>