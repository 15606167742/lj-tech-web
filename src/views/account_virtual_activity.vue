<template>
	<ui-form :model="info" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-hidden v-model="data.accountId" autosubmit/>
		<ui-select v-model="data.level" label="达人等级" required>
			<ui-option value="0" text="普通会员" />
			<ui-option value="1" text="一星达人" />
			<ui-option value="2" text="二星达人" />
			<ui-option value="3" text="三星达人" />
			<ui-option value="4" text="四星达人" />
			<ui-option value="5" text="五星达人" />
		</ui-select>
		<ui-number v-model="data.baseHashrate" label="个人活跃度" :max="10000000000000000" :precision="3" required/>
		<ui-number v-model="data.directQty" label="直推人数" :max="9999999" required/>
		<ui-number v-model="data.developQty" label="团总推广人数" :max="9999999" required/>
		<ui-number v-model="data.protHashrate" label="小区活跃度" :max="10000000000000000" :precision="3" required/>
		<ui-number v-model="data.protQty" label="小区活跃人数" :max="9999999" required/>
		<ui-number v-model="data.subPortHashrate" label="大区活跃度" :max="10000000000000000" :precision="3" required/>
		<ui-number v-model="data.subPortQty" label="大区活跃人数" :max="9999999" required/>
		<ui-number v-model="data.topHashrate" label="团队活跃度" :max="10000000000000000" :precision="3" required/>
		<ui-number v-model="data.teamQty" label="团队活跃人数" :max="9999999" required/>
		<ui-select v-model="data.isValid" label="是否在前端展示" required>
			<ui-option value="0" text="否" />
			<ui-option value="1" text="是" />
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
			info:{},
			submitData:{}
		};
	},
	mounted() {
		this.getInfo();
	},
	methods:{
		getInfo(){
			this.$axios.get('/admin/adminAddearings/queryVirtualRate?accountId='+this.params.data.id).then(data=>{
				this.info = data;
				this.info.accountId = this.params.data.id;
			})
		},
		submit(){
			this.$axios.request({url:'/admin/adminAddearings/updateUpgrade',data:this.submitData,method:this.params.type,urlencode:true})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>