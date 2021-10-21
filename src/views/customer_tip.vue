<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" :columns="1" v-slot="{data}">
		<ui-hidden v-model="data.id" autosubmit submitfield="accountId"/>
		<ui-textarea v-model="data.comment" label="备注" required />
		<!-- <ui-template>
			<ui-button button-type="text" @click="appendRemark(remark)" v-for="remark in remarks">{{remark}}</ui-button>
		</ui-template> -->
		<ui-template>
			<ui-button type="submit" @submit="submit"></ui-button>
		</ui-template>
	</ui-form>
</template>

<script>
import store from '@/store'

export default {
	props:['params','close'],
	data(){
		return {
			submitData:{},
			// remarks: ['增加活跃度']
		};
	},
	methods:{
		// appendRemark(remark){
		// 	if(this.params.data.comment == ''){
		// 		this.params.data.comment += remark;
		// 	}else{
		// 		this.params.data.comment += (','+remark);
		// 	}
		// },
		submit(){
			this.$axios.request({url:'/admin/account/addRemark',data:this.submitData,method:'POST',urlencode:true})
				.then(d => {
					this.close();
				}).end();
		},
	},
}
</script>

<style>
</style>