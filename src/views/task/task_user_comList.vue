<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.nickName" label="昵称"/>
			<ui-text v-model="data.mobile" label="手机号" value-type="phone"/>
			<ui-select v-model="data.providerId" label="任务商" url="/admin/taskProvider" value-field="id" text-field="enterpriseName"/>
			<ui-text v-model="data.taskName" label="任务名称"/>
			<ui-select v-model="data.advertiserId" label="广告主" url="/admin/advertiser" value-field="id" text-field="advertiserName"/>
			<ui-select v-model="data.state" label="任务状态">
				<ui-option value="0" text="进行中"/>
				<ui-option value="1" text="审核中"/>
				<ui-option value="2" text="已完成"/>
				<ui-option value="3" text="未通过"/>
				<ui-option value="4" text="已失效"/>
			</ui-select>
			<ui-date v-model="data.startDate" label="开始时间" type="datetime"/>
			<ui-date v-model="data.endDate" label="结束时间" type="datetime"/>
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="export" @click="exportExcel">导出</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/accountTask/listAll" :search="condition" v-slot="{data}" :search-com="$refs.search" autolimitwidth>
			<ui-text v-model="data.nickName" label="昵称"/>
			<ui-text v-model="data.mobile" label="手机号" value-type="phone"/>
			<ui-text v-model="data.enterpriseName" label="任务商名称"/>
			<ui-text v-model="data.taskName" label="任务名称"/>
			<ui-text v-model="data.advertiser" label="广告主"/>
			<ui-date v-model="data.submitTime" label="提交时间" type="datetime"/>
			<ui-text v-model="data.price" label="领取单份DD"/>
			<ui-text v-model="data.unitPrice" label="加入单份DD"/>
			<ui-text v-model="data.stateDesc" label="任务状态"/>
			<ui-date v-model="data.approveTime" label="审核时间" type="datetime"/>
			<ui-textarea v-model="data.reason" label="理由"/>
			<ui-template label="图片" width="80px">
				<el-image style="width: 60px;height: 60px;" fit="cover" :src="data.detailList | setFileList | getFirst" :preview-src-list="data.detailList | setFileList">
					<div slot="error" style="height: 100%;font-size: 12px;color: #999;display: flex;justify-content: center;align-items: center;">暂无图片</div>
				</el-image>
			</ui-template>
			<ui-text v-model="data.ip" label="ip地址" value-type="ip"/>
		</com-table>
	</div>

</template>

<script>
	import qs from 'qs'
	
	export default {
		data() {
			return {
				search: {},
				condition: {}
			};
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
		methods: {
			exportExcel() {
				var headers = Object.assign(this.search, {
					token: this.$store.state.app.token,
				});
				window.open(WEBCONFIG.connectPath + '/admin/accountTask/export?' + qs.stringify(headers));
			},
		},
	}
</script>

<style>
</style>
