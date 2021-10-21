<template>
	<div class="com-list-content">
		<el-alert type="info" :closable="false" style="margin-bottom:15px;">
			<div class="pagetitle" slot="title">
				<el-button @click="$router.replace({name:'task_launch_list'})" type="info" plain size="mini" icon="el-icon-back">返回</el-button>
			</div>
		</el-alert>
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.nickName" label="昵称" />
			<ui-text v-model="data.mobile" label="手机号" value-type="phone" />
			<ui-date v-model="data.startDate" label="开始时间" type="datetime" />
			<ui-date v-model="data.endDate" label="结束时间" type="datetime" />
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" :url="url" :search="condition" v-slot="{data}"
		 :search-com="$refs.search" autolimitwidth>
			<ui-text v-model="data.nickName" label="昵称" />
			<ui-text v-model="data.mobile" label="手机号" value-type="phone" />
			<ui-text v-model="data.taskName" label="任务名称" />
			<ui-date v-model="data.submitTime" label="提交时间" type="datetime" />
			<ui-text v-model="data.stateDesc" label="任务状态" />
			<ui-textarea v-model="data.reason" label="理由" />
			<ui-template label="图片" width="80px">
				<el-image style="width: 60px;height: 60px;" fit="cover" :src="data.detailList | setFileList | getFirst"
				 :preview-src-list="data.detailList | setFileList">
					<div slot="error" style="height: 100%;font-size: 12px;color: #999;display: flex;justify-content: center;align-items: center;">暂无图片</div>
				</el-image>
			</ui-template>
			<ui-text v-model="data.ip" label="ip地址" value-type="ip" />
		</com-table>
	</div>
</template>

<script>
	import qs from 'qs'
	export default {
		data() {
			return {
				search: {},
				condition: {},
				resourcePath: WEBCONFIG.resourcePath,
				url: '',
				selectList: [],
				taskLaunch: {},
			};
		},
		activated() {
			if (this.$route.params.id) {
				this.url = '/admin/accountTask/listPage?taskLaunchId='+this.$route.params.id
				this.taskLaunch = this.$route.params;
			}
		},
		filters: {
			getFirst(value) {
				if (value.length < 1) return ''
				return value[0];
			},
			setFileList(value) {
				if(!value){
					return [];
				}
				let selfFileList = [];
				value.forEach(o=>{
					if(o.type == 4){
						if (o.imgs != null && o.imgs != '') {
							let vals = o.imgs.split(',');
							for (let i = 0; i < vals.length; i++) {
								if (vals[i].slice(0, 4).toLowerCase() == 'http') {
									selfFileList.push(vals[i]);
								} else {
									selfFileList.push(WEBCONFIG.resourcePath + vals[i]);
								}
							}
						}
					}
				})
				return selfFileList;
			}
		},
		mounted() {},
		methods: {},
	}
</script>

<style>
</style>
