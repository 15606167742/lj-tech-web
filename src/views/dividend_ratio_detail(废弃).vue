<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-hidden v-model="data.id" autosubmit/>
		<ui-number v-model="data.level" label="用户级别" :columns="2" view/>
		<ui-number v-model="data.avgQuota" label="DD加权分红" :max="1" :precision="3" required/>
		<ui-number v-model="data.avgAdQuota" label="金豆分润比例" :max="max" :precision="3" required/>
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
			submitData:{},
			max: 1,
		};
	},
	mounted() {
		this.$axios.get('/admin/vipUpgrade/queryVipUpgrade').then(data=>{
			data.forEach(item=>{
				if(item.id!=this.params.data.id){
					this.max-=item.avgAdQuota
				}
			})
		})
	},
	methods:{
		submit(){
			this.$axios.request({url:'/admin/vipUpgrade/qupdateVipUpgrade',data:this.submitData,method:this.params.type,urlencode:true})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>
