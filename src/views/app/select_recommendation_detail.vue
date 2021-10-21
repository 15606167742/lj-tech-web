<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-hidden v-model="data.id" autosubmit/>
		<!-- <ui-text v-model="data.goodsid" label="商品ID" required/> -->
		<ui-number v-model="data.goodsid" label="商品ID" required/>
		<ui-text v-model="data.name" label="商品名称" required/>
		<ui-image v-model="data.imgurl" label="图片" required/>
		<ui-text v-model="data.price" label="商品价格" required/>
		<ui-number v-model="data.sort" label="排序" required/>
		<!-- <ui-textarea v-model="data.description" label="商品描述"/> -->
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
	methods:{
		submit(){
			this.$axios.request({url:'/admin/selectionRecommended',data:this.submitData,method:this.params.type})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>
