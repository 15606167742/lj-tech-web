<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-hidden v-model="data.id" autosubmit/>
		<ui-attachment v-model="data.introductionVideo" label="领哆哆攻略"/>
		<ui-text v-model="data.douyin" label="领哆哆抖音链接" value-type="url"/>
		<ui-attachment v-model="data.introductionVideoHk" label="海客攻略"/>
		<ui-text v-model="data.douyinHk" label="海客抖音链接" value-type="url"/>
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
			this.$axios.request({url:'/admin/task/'+this.params.data.id,data:this.submitData,method:this.params.type,urlencode:true})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>