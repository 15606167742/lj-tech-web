<template>
	<ui-form :model="info" :transfer-model.sync="submitData" v-slot="{data}" :columns="1" style="width: 600px;">
		<ui-text v-model="data.mobile" label="手机号" value-type="phone" required/>
		<ui-select v-model="data.level" label="健康礼包" url="/admin/adminAddearings/queryMillList" value-field="level" text-field="millName" required/>
		<ui-template>
			<ui-button type="submit" @submit="submit"></ui-button>
		</ui-template>
	</ui-form>
</template>

<script>
export default {
	data(){
		return {
			info:{
				mobile: null,
				level: null
			},
			submitData:{}
		};
	},
	mounted() {},
	methods:{
		submit(){
			this.$axios.request({url:'/admin/adminAddearings/addMill',params:this.submitData,method:'get'})
			.then(data=>{
				this.$message({
					type: 'success',
					message: '操作成功!'
				});
				this.info = {}
			}).end();
		}
	},
}
</script>

<style>
</style>