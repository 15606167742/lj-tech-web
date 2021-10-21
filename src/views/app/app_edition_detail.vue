<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-hidden v-model="data.id" autosubmit/>
		<ui-text v-model="data.versionName" label="版本名" />
		<ui-number v-model="data.versionCode" label="版本号" required/>
		<ui-select v-model="data.apkType" label="类型" required>
			<ui-option value="1" text="领哆哆"/>
			<ui-option value="2" text="环梦"/>
			<ui-option value="3" text="领哆哆"/>
		</ui-select>
		<ui-attachment v-model="data.url" label="apk" required/>
		<ui-textarea v-model="data.remark" label="备注"/>
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
			this.$axios.request({url:'/admin/appVersion',data:this.submitData,method:this.params.type})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>
