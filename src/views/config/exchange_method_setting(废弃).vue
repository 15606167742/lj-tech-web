<template>
	<ui-form :model="info" :transfer-model.sync="submitData" v-slot="{data}" :view="edited?undefined:''" style="width: 600px;">
		<ui-select v-model="data.method" label="消耗方式">
			<ui-option value="0" text="默认" />
			<ui-option value="3" text="按比例消耗MLDD/ZLDD" />
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
				method: null
			},
			submitData:{}
		};
	},
	mounted() {
		this.getInfo();
	},
	methods:{
		getInfo() {
			this.$axios.request({url:'/admin/mill/getPayMethod', method: 'get'})
			.then(data=>{
				this.info.method = data;
				this.edited = false;
			}).end();
		},
		submit(){
			this.$axios.request({url:'/admin/mill/setPayMethod',data:this.submitData,method:'put',urlencode:true})
			.then(data=>{
				this.getInfo();
			}).end();
		}
	},
}
</script>

<style>
</style>