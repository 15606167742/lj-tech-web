<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-hidden v-model="data.id" submitfield="ids" autosubmit/>
		<ui-select v-model="state" label="审核状态" nosubmit required :columns="2">
			<ui-option value="batchPass" text="通过" />
			<ui-option value="batchReject" text="拒绝" />
		</ui-select>
		<ui-textarea v-model="data.reason" label="备注" :required="state=='batchReject'?'':undefined" />
		<ui-template>
			<ui-button button-type="text" @click="appendRemark(remark)" v-for="remark in remarks">{{remark}}</ui-button>
		</ui-template>
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
			state:'batchPass',
			remarks: ['姓名、支付宝信息有误', '身份证号码信息有误', '银行信息有误', '银行省市信息有误']
		};
	},
	mounted() {
	},
	methods:{
		appendRemark(remark){
			if(this.params.data.reason == ''){
				this.params.data.reason += remark;
			}else{
				this.params.data.reason += (','+remark);
			}
		},
		submit(){
			this.$axios.request({url:'/admin/cashOut/'+this.state,data:this.submitData,method:'post',urlencode:true})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>