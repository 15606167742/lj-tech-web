<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" :columns="1" v-slot="{data}">
		<ui-textarea v-model="data.remark" label="封号原因" required />
		<ui-template>
			<ui-button button-type="text" @click="appendRemark(remark)" v-for="remark in remarks">{{remark}}</ui-button>
		</ui-template>
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
			remarks: ['违规操作']
		};
	},
	methods:{
		appendRemark(remark){
			if(this.params.data.remark == ''){
				this.params.data.remark += remark;
			}else{
				this.params.data.remark += (','+remark);
			}
		},
		submit(){
			this.$axios.request({url:'/admin/account/forbidden', params:{accountId: this.params.data.id, operation: 0, remark: this.params.data.remark},method: 'post'})
				.then(d => {
					this.close();
				}).end();
		},
	},
}
</script>

<style>
</style>