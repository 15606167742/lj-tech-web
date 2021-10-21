<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}" :view="params.type=='view'">
		<ui-hidden v-model="data.id" autosubmit/>
		<ui-text v-model="data.name" label="商品名称" :maxlength="15" required/>
		<ui-text v-model="data.brand" label="商品品牌" :maxlength="10" />
		<ui-image v-model="data.pictureUrl" label="商品图片" multiple :limit="5" :columns="2" required/>
		<ui-text v-model="data.description" label="商品描述" :maxlength="25" required/>
		<ui-richtext v-model="data.details" label="商品详情" />
		<!-- <ui-number v-model="data.originalPrice" label="原价" :min="parseInt(data.currentPrice)" :max="1000000000" /> -->
		<ui-number v-model="data.currentPrice" label="DD" :min="1" :max="parseInt(data.originalPrice)" required/>
		<ui-select v-model="data.currencyType" label="DD类型" required>
			<ui-option value="1" text="MLDD" />
			<ui-option value="2" text="ZLDD" />
		</ui-select>
		<ui-template v-if="params.type!='view'">
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
			this.$axios.request({url:'/admin/lucky-purchase-goods',data:this.submitData,method:this.params.type})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>