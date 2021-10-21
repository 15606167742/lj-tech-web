<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-template :label="isProgress?'任务执行进度':''">
			<el-progress :percentage="percentage" :format="format" v-if="isProgress"></el-progress>
			<ui-text value="暂无任务进行中" view v-else />
		</ui-template>
	</ui-form>
</template>

<script>
export default {
	props:['params','close'],
	data(){
		return {
			submitData:{},
			destroyFlag:false,
			isProgress:true,
			percentage:0,
			formatString:'',
		};
	},
	mounted() {
		this.getProgress();
	},
	destroyed() {
		this.destroyFlag = true;
	},
	methods:{
		getProgress() {
			this.$axios.get('/admin/account/virtualAccountTaskProgress').then(data => {
				this.isProgress = true;
				let finished = isNaN(parseInt(data.finished)) ? 0 : parseInt(data.finished);
				let total = isNaN(parseInt(data.total)) ? 0 : parseInt(data.total);
				this.percentage = parseFloat((finished/total*100).toFixed(2));
				this.formatString = finished+'/'+total;
				if (this.destroyFlag) {
					return
				}
				this.timeout = setTimeout(() => {
					this.getProgress();
				}, 1000)
			}).catch(err => {
				this.isProgress = false;
			})
		},
		format() {
			return this.formatString;
		}
	},
}
</script>

<style scoped lang="scss">
	/deep/ .el-progress-bar{
		width: 90%;
	}
</style>