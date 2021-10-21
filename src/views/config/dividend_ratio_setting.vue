<template>
	<ui-form :model="info" :transfer-model.sync="submitData" v-slot="{data}" style="width: 600px;">
		<ui-number v-model="data.star.star" label="星达人手续费分红比例" :max="1" :precision="3" required :view="data.star.edited?undefined:''"/>
		<ui-template>
			<ui-button icon="el-icon-edit" button-type="primary" @click="startEdit(data.star)" v-if="!data.star.edited">编辑</ui-button>
			<template v-else>
				<ui-button type="submit" @submit="submit1(data.star)"></ui-button>
				<ui-button button-type="primary" @click="getInfo1">取消</ui-button>
			</template>
		</ui-template>
		<ui-number v-model="data.city.city" label="城市盟主手续费分红比例" :max="1" :precision="3" required :view="data.city.edited?undefined:''"/>
		<ui-template>
			<ui-button icon="el-icon-edit" button-type="primary" @click="startEdit(data.city)" v-if="!data.city.edited">编辑</ui-button>
			<template v-else>
				<ui-button type="submit" @submit="submit2(data.city)"></ui-button>
				<ui-button button-type="info" @click="getInfo2">取消</ui-button>
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
				star: {
					star: null,
					edited: false,
				},
				city: {
					city: null,
					edited: false,
				},
			},
			submitData:{}
		};
	},
	mounted() {
		this.getInfo1();
		this.getInfo2();
		// this.getInfo();
	},
	methods:{
		getInfo1() {
			this.$axios.request({url:'/admin/vipUpgrade/getValue', method: 'get'})
			.then(data=>{
				this.info.star.star = data;
				this.info.star.edited = false;
			}).end();
		},
		getInfo2() {
			this.$axios.request({url:'/admin/cityLeader/getChargeProfit', method: 'get'})
			.then(data=>{
				this.info.city.city = data;
				this.info.city.edited = false;
			}).end();
		},
		startEdit(obj){
			obj.edited = true;
		},
		submit1(star){
			this.$axios.request({url:'/admin/vipUpgrade/setValue',data:{rate: star.star},method:'post',urlencode:true})
			.then(data=>{
				this.getInfo1();
			}).end();
		},
		submit2(city){
			this.$axios.request({url:'/admin/cityLeader/setChargeProfit',data:{profitRate: city.city},method:'put',urlencode:true})
			.then(data=>{
				this.getInfo2();
			}).end();
		},
	},
}
</script>

<style>
</style>