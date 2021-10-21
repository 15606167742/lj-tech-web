<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.taskName" label="任务名称"/>
			<ui-text v-model="data.taskNo" label="任务号"/>
			<ui-text v-model="data.mobile" label="提交人手机号"/>
			<ui-text v-model="data.operatorName" label="提交人"/>
			<ui-text v-model="data.remark" label="备注"/>
			<ui-date v-model="data.startDate" label="开始时间" type="datetime"/>
			<ui-date v-model="data.endDate" label="结束时间" type="datetime"/>
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="export" @click="exportExcel">导出</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/thirdTaskView/page" :search="condition" v-slot="{data}" :search-com="$refs.search" autolimitwidth>
			<ui-text v-model="data.taskName" label="任务名称"/>
			<ui-text v-model="data.operatorName" label="操作人名称"/>
			<ui-text v-model="data.commission" label="DD"/>
			<ui-date v-model="data.createTime" label="创建时间" type="datetime"/>
			<ui-template label="图片" width="80px">
				<el-image style="width: 60px;height: 60px;" fit="cover" :src="data.iconUrl"
				 :preview-src-list="[data.iconUrl]">
					<div slot="error" style="height: 100%;font-size: 12px;color: #999;display: flex;justify-content: center;align-items: center;">暂无图片</div>
				</el-image>
			</ui-template>
			<ui-text v-model="data.mobile" label="手机号" value-type="phone"/>
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
			getStatusStr(v) {
				let str = ''
				if (v === 0) {
					str = '审核中'
				} else if (v === 2) {
					str = '成功'
				} else if (v === -1) {
					str = '失败'
				}
				return str
			},
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
				window.open(WEBCONFIG.connectPath + '/admin/thirdTaskView/export?' + qs.stringify(headers));
			},
		},
	}
</script>

<style>
</style>
