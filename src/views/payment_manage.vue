<template>
	<ui-form :model="info" :transfer-model.sync="submitData" v-slot="{data}" :view="edited?undefined:''" style="width: 600px;">
		<ui-select v-model="data.payType" label="支付通道" :columns="2" required>
			<!-- <ui-option value="0" text="全部" /> -->
			<ui-option value="1" text="支付宝" />
			<!-- <ui-option value="2" text="微信" /> -->
		</ui-select>
		<ui-template>
			<ui-button icon="el-icon-edit" button-type="primary" @click="edited=true" v-if="!edited">编辑</ui-button>
			<template v-else>
				<ui-button type="submit" @submit="submit"></ui-button>
				<ui-button button-type="primary" @click="getInfo">取消</ui-button>
			</template>
		</ui-template>
	</ui-form>
</template>

<script>
export default {
	data(){
		return {
			edited: false,
			info:{
				payType: null
			},
			submitData:{}
		};
	},
	mounted() {
		this.getInfo();
	},
	methods:{
		getInfo() {
			this.$axios.request({url:'/admin/pay/getPayType', method: 'get'})
			.then(data=>{
				this.info.payType = data;
				this.edited = false;
			}).end();
		},
		submit(){
			this.$axios.request({url:'/admin/pay/updatePayType',data:this.submitData,method:'post',urlencode:true})
			.then(data=>{
				this.getInfo();
			}).end();
		}
	},
}
</script>

<style>
</style>