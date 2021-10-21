<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-hidden v-model="data.id" autosubmit/>
		<ui-text v-model="data.code" label="编号" required :view="params.type=='add'?undefined:''"/>
		<ui-text v-model="data.name" label="卡名" required/>
		<ui-select v-model="data.cardType" label="卡片类型" required :view="params.type=='add'?undefined:''">
			<ui-option value="1" text="会员卡" />
			<ui-option value="2" text="多开卡" />
		</ui-select>
		<ui-number v-model="data.boundQty" label="可绑定手机号数量" :max="100" required :view="params.type=='add'?undefined:''" v-if="data.cardType=='2'"/>
		<ui-number v-model="data.validateDay" label="有效天数" :min="1" :max="365" required :view="params.type=='add'?undefined:''" v-if="data.cardType=='1'"/>
		<ui-select v-model="data.validateDay" label="有效天数" required required :view="params.type=='add'?undefined:''" v-if="data.cardType=='2'">
			<ui-option value="30" text="月卡" />
			<ui-option value="180" text="半年卡" />
			<ui-option value="360" text="年卡" />
		</ui-select>
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
	methods:{
		submit(){
			let url;
			if (this.params.type=='add'){
				url = '/admin/deviceCard/add';
			} else {
				url = '/admin/deviceCard/edit';
			}
			this.$axios.request({url,data:this.submitData,method:'post'})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>
