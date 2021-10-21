<template>
	<ui-form :model="info" :transfer-model.sync="submitData" v-slot="{data}" :view="edited?undefined:''" style="width: 600px;">
		<ui-textarea v-model="data.content" label="公告" :columns="2"/>
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
				content: null
			},
			submitData:{}
		};
	},
	mounted() {
		this.getInfo();
	},
	methods:{
		getInfo() {
			this.$axios.request({url:'/admin/announce/show?type=1', method: 'get'})
			.then(data=>{
				this.info.content = data;
				this.edited = false;
			}).end();
		},
		submit(){
			this.$axios.request({url:'/admin/announce/editAnnounce?type=1',data:this.submitData,method:'post',urlencode:true})
			.then(data=>{
				this.getInfo();
			}).end();
		}
	},
}
</script>

<style>
</style>