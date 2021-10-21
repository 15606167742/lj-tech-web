<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-hidden v-model="data.id" autosubmit/>
		<ui-select v-model="data.millLevel" label="礼包等级" url="/admin/limitConfig/getMillList" value-field="level" text-field="level" required :view="params.type=='add'?undefined:''"/>
		<ui-number v-model="data.upperLimit" label="额度" submitfield="limit" :max="2000" required/>
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
		};
	},
	methods:{
		submit(){
			let url = null;
			if (this.params.type=='add') {
				url = '/admin/limitConfig/addLimit';
			} else{
				url = '/admin/limitConfig/updateLimit';
			}
			this.$axios.request({url,data:this.submitData,method:this.params.type,urlencode:true})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>
