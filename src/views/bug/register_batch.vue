<template>
	<div class="com-list-content">
		<com-search>
			<ui-template>
				<ui-button icon="el-icon-finished" button-type="primary" confirm-text="确定是否执行批量完成任务吗？" @click="finish">批量完成任务</ui-button>
			</ui-template>
		</com-search>
		<ui-form :model="info" :transfer-model.sync="submitData" v-slot="{data}" :columns="4">
			<ui-template :label="isProgress?'任务进度':''">
				<el-progress :percentage="percentage" :format="format" v-if="isProgress"></el-progress>
				<ui-text value="暂无任务进行中" view v-else />
			</ui-template>
			<ui-text v-model="mainPhone" label="上级手机号" value-type="phone" required :columns="2"
				:view="isProgress?'':undefined" />
			<ui-number v-model="skipConfirm" label="跳过实名认证数量" :max="maxCount" :columns="2"
				:view="isProgress?'':undefined" />
			<ui-textarea v-model="phoneString" label="下级手机号文本" :maxlength="15000" />
			<ui-select v-model="separator" label="分隔符">
				<ui-option :value="s.value" :text="s.text" :key="s.value" v-for="s in separatorList" />
			</ui-select>
			<ui-template :columns="1">
				<ui-button icon="el-icon-magic-stick" button-type="primary" @click="formatPhone" :disabled="isProgress">
					识别手机号(最多识别{{maxCount}}个)</ui-button>
				<ui-button icon="el-icon-remove-outline" button-type="info" @click="cleanPhone" :disabled="isProgress">清空
				</ui-button>
			</ui-template>
			<!-- <ui-template label="变更GS" required>
				<ui-select v-model="data.tag" required style="width: 10%;display: inline-block;">
					<ui-option value="0" text="-"/>
					<ui-option value="1" text="+"/>
				</ui-select>
				<ui-number v-model="data.amount" :precision="4" required style="width: 80%;display: inline-block;"/>
			</ui-template> -->
			<ui-template>
				<ui-button type="submit" @submit="submit" :disabled="isProgress"></ui-button>
			</ui-template>
			<ui-template>
				<div class="tip">识别到{{phoneList.length}}个手机号</div>
			</ui-template>
			<ui-text :value="phone" :key="phone" v-for="phone in phoneList" />
		</ui-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				isProgress: true,
				percentage: 0,
				formatString:'',
				mainPhone: '',
				skipConfirm: 0,
				phoneString: '',
				separator: '\n',
				separatorList: [{
						value: '\n',
						text: '换行 (\\n)',
					},
					{
						value: ',',
						text: '逗号 (,)',
					},
					{
						value: ' ',
						text: '空格 ( )',
					},
				],
				phoneList: [],
				maxCount: 1000,
				submitData: {},
			};
		},
		mounted() {
			this.getProgress();
		},
		methods: {
			finish() {
				this.$axios.post('/admin/account/virtualAccountTask')
					.then(d => {
						this.$message({
							type: 'success',
							message: '执行批量完成任务!'
						});
					}).end();
			},
			getProgress() {
				this.$axios.get('/admin/account/registerBatchProgress', {
					params: {
						sharePhone: this.mainPhone
					}
				}).then(data => {
					this.isProgress = true;
					let finished = isNaN(parseInt(data.finished)) ? 0 : parseInt(data.finished);
					let total = isNaN(parseInt(data.total)) ? 0 : parseInt(data.total);
					this.percentage = parseFloat((finished/total*100).toFixed(2));
					this.formatString = finished+'/'+total;
					// this.percentage = isNaN(parseFloat(data)) ? 0 : parseFloat(data);
					setTimeout(() => {
						this.getProgress();
					}, 1000)
				}).catch(err => {
					this.isProgress = false;
				})
			},
			format() {
				return this.formatString;
			},
			formatPhone() {
				if (this.phoneString === null || this.phoneString === '') {
					this.$message({
						message: '下级手机号文本不能为空',
						type: 'warning'
					});
					return
				}
				this.phoneList = this.phoneString.split(this.separator).filter(item=>/^1\d{10}$/.test(item));
				if (this.phoneList.length > this.maxCount) {
					this.$alert('识别到手机号超过' + this.maxCount + '个，自动识别前' + this.maxCount + '个')
					this.phoneList.splice(this.maxCount, this.phoneList.length - this.maxCount);
				} else {
					this.$alert('识别到' + this.phoneList.length + '个手机号')
				}
			},
			cleanPhone() {
				this.mainPhone = '';
				this.phoneString = '';
				this.phoneList.splice(0, this.phoneList.length);
			},
			submit() {
				if (this.phoneList.length == 0) {
					this.$message({
						message: '请至少识别一个下级手机号',
						type: 'warning'
					});
					return
				}
				this.$axios.request({
						url: '/admin/account/registerBatch',
						data: {
							sharePhone: this.mainPhone,
							phoneList: this.phoneList.join(','),
							skipAuthCount: this.skipConfirm
						},
						method: 'POST',
						urlencode: true
					})
					.then(data => {
						console.log(data)
						this.getProgress();
					}).end();
			},
		},
	}
</script>

<style scoped lang="scss">
	.tip{
		font-size: 12px;
		color: red;
	}
	
	/deep/ .el-progress-bar{
		width: 90%;
	}
</style>
