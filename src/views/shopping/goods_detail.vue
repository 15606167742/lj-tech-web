<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-hidden v-model="data.id" autosubmit/>
		<ui-text v-model="data.code" label="商品编号" required :view="params.type=='add'?undefined:''"/>
		<ui-select v-model="data.prodType" label="商品类型" required v-if="params.type=='add'">
			<!-- <ui-option value="0" text="普通" /> -->
			<ui-option value="2" text="赠送礼包" />
		</ui-select>
		<template v-if="data.prodType===0">
			<ui-text v-model="data.name" label="商品名称" required/>
			<ui-textarea v-model="data.description" label="商品描述" required/>
			<ui-number v-model="data.integralGive" label="赠送积分数量" :precision="3" :min="0.001" required/>
			<ui-select v-model="data.type" label="状态" required>
				<ui-option value="0" text="不生效" />
				<ui-option value="1" text="赠送积分生效" />
			</ui-select>
		</template>
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
	mounted() {},
	methods:{
		submit(){
			let url;
			if(this.params.type == 'add'){
				url = '/admin/goodsConfig/add';
			}else{
				url = '/admin/goodsConfig/edit';
			}
			this.$axios.request({url,data:this.submitData,method:'post',urlencode:true})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>