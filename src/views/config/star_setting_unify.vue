<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-select v-model="data.type" label="修改类型" required>
			<ui-option value="1" text="直推人数" />
			<ui-option value="2" text="直推持有礼包人数" />
		</ui-select>
		<ui-number v-model="data.count" label="人数" :max="99999999" required/>
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
	methods:{
		submit(){
			this.$axios.request({url:'/admin/vipUpgrade/updateUubordinate',data:this.submitData,method:this.params.type,urlencode:true})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>
