<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-hidden v-model="data.id" autosubmit/>
		<ui-text v-model="data.title" label="标题" required/>
		<ui-text v-model="data.author" label="作者" :maxlength="5" required/>
		<!-- <ui-select v-model="data.author" label="作者" required>
			<ui-option value="哆哆管家" text="哆哆管家"/>
			<ui-option value="蜡笔小哆" text="蜡笔小哆"/>
			<ui-option value="哆唻咪" text="哆唻咪"/>
		</ui-select> -->
		<ui-template label="预览图" :columns="1" required>
			<div class="tip">图片宽高比2:1</div>
			<ui-image v-model="data.previewPic" required cropper :cropperOption="{fixedNumber: [2,1]}"/>
		</ui-template>
		<ui-image v-model="data.headPicture" label="头像" />
		<ui-template label="视频" required>
			<div class="tip">上传视频不宜超过50M，且上传成功标识为绿色小勾（100%还未成功）</div>
			<ui-attachment v-model="data.url" uploadPath="/admin/upload/sftpFiles" accept="video/*" filesize="50M" required/>
		</ui-template>
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
			if (this.params.type=='add') {
				url = '/admin/college/addVideo';
			} else{
				url = '/admin/college/updateVideo';
			}
			this.$axios.request({url,data:this.submitData,method:this.params.type,urlencode:true})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style lang="scss" scoped>
	.tip{
		color: red;
		font-size: 12px;
	}
</style>