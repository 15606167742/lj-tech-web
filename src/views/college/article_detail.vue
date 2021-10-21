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
		<ui-template label="图片" :columns="1" required>
			<div class="tip">图片宽高比{{data.typeId==2?'2.5:1':'1.3:1'}}</div>
			<ui-image v-model="data.url" required cropper :cropperOption="{fixedNumber: data.typeId==2?[2.5,1]:[1.3,1]}"/>
		</ui-template>
		<ui-image v-model="data.headPicture" label="头像" />
		<ui-text v-model="data.description" label="描述" required/>
		<ui-select v-model="data.typeId" label="类别" url="/admin/college/pcGetTypeList" value-field="id" text-field="typeName" required/>
		<ui-richtext v-model="data.content" label="内容" required />
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
			this.computePicCount();
			let url;
			if (this.params.type=='add') {
				url = '/admin/college/addArticle';
			} else{
				url = '/admin/college/updateArticle';
			}
			this.$axios.request({url,data:this.submitData,method:this.params.type,urlencode:true})
			.then(data=>{
				this.close();
			}).end();
		},
		computePicCount(){
			let arr = this.submitData.content.match(/<img/g);
			if(arr){
				this.submitData.picCount = arr.length;
			}else{
				this.submitData.picCount = 0;
			}
		}
	},
}
</script>

<style scoped lang="scss">
	.tip{
		font-size: 12px;
		color: red;
	}
</style>