<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" :columns="1" v-slot="{data}">
		<ui-hidden v-model="data.id" autosubmit/>
		<ui-text v-model="data.name" label="客服名" required/>
		<ui-image v-model="data.code" label="二维码" required/>
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
			this.$axios.request({url:'/admin/customer',data:this.submitData,method:this.params.type})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>