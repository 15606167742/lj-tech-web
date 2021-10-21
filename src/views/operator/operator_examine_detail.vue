<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-hidden v-model="data.id" autosubmit/>
		<ui-text :value="$g(data, 'account.realName')" label="姓名" view/>
		<ui-text :value="$g(data, 'account.no')" label="身份证号" value-type="idcard" view/>
		<ui-textarea :value="$g(data, 'account.address')" label="地址" view/>
		<ui-image v-model="data.attach" label="协议照片" multiple/>
		<ui-text value="拒绝" label="审核状态" required :columns="2" view v-if="data.reject"/>
		<ui-select v-model="data.approveState" label="审核状态" required :columns="2" v-else>
			<ui-option value="2" text="通过" />
			<ui-option value="-1" text="拒绝" />
		</ui-select>
		<ui-textarea v-model="data.remark" label="备注" />
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
			if(this.params.data.reject){
				this.params.data.approveState = '-1';
				this.submitData.approveState = '-1';
			}
			this.$axios.request({url:'/operatorApprove/'+this.params.data.id+'/'+this.params.data.approveState,data:this.submitData,method:'post',urlencode:true})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>