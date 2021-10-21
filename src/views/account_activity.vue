<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-hidden v-model="data.id" autosubmit submitfield="accountId"/>
		<ui-number v-model="data.baseRate" label="个人活跃度" submitfield="baseHashRate" :precision="3" required/>
		<ui-number v-model="data.directQty" label="直推人数" required/>
		<ui-number v-model="data.hashRate" label="团队活跃度" submitfield="topHashRate" :precision="3" required/>
		<ui-number v-model="data.teamQty" label="团队人数" required/>
		<ui-number v-model="data.protHashRate" label="小区活跃度" submitfield="protHashRate" :precision="3" required/>
		<ui-number v-model="data.protQty" label="小区人数" required/>
		<ui-template>
			<ui-button type="submit" @submit="submit"></ui-button>
			<ui-button type="reset" v-if="params.type=='add'"></ui-button>
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
	methods:{
		submit(){
			this.$axios.request({url:'/admin/adminAddearings/updateAccountRate',data:this.submitData,method:'POST',urlencode:true})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>