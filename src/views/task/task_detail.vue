<template>
	<ui-form :model="model" v-slot="{data}" view>
		<ui-text v-model="data.advertiser" label="广告主"/>
		<!-- <ui-text v-model="data.website" label="网址"/> -->
		<ui-text v-model="data.taskName" label="任务名称"/>
		<ui-image v-model="data.taskIcon" label="任务图标" size="mini"/>
		<ui-select v-model="data.typeId" label="任务分类" url="/admin/taskType" value-field="id" text-field="typeName"/>
		<ui-text v-model="data.taskLabel" label="任务标签"/>
		<ui-textarea v-model="data.steps" label="操作步骤"/>
		<ui-textarea v-model="data.attention" label="注意事项"/>
		<!-- <ui-select v-model="data.approvalRequirements" label="审核要求" multiple>
			<ui-option value="0" text="图片"/>
			<ui-option value="1" text="手机号"/>
			<ui-option value="2" text="用户名"/>
		</ui-select> -->
		<!-- <ui-text v-model="data.otherRequirement" label="其他审核要求"/> -->
		<ui-select v-model="data.approvalType" label="审批类型">
			<ui-option value="0" text="自家"/>
			<ui-option value="1" text="广告主"/>
		</ui-select>
		<ui-number v-model="data.approvalTime" label="审核时间(小时)"/>
		<ui-number v-model="data.unitPrice" label="加入单份DD"/>
		<ui-text v-model="data.business" label="所属商务"/>
		<ui-switch v-model="data.needIntroduction" label="是否需要攻略"/>
		<ui-date v-model="data.createTime" label="创建时间" type="datetime"/>
		<ui-template label="步骤">
			<ui-table ref="table" :data="data.detailList" v-slot="{row}" view>
				<ui-hidden v-model="row.id"/>
				<ui-template label="要求" width="500">
					<ui-image v-model="row.step" multiple required v-if="row.type==0||row.type==4" view/>
					<ui-textarea v-model="row.website" style="text-align:left;" :maxlength="1000" required v-if="row.type==1" view/>
					<ui-textarea v-model="row.requirement" style="text-align:left;" :maxlength="1000" required v-if="row.type==2||row.type==3" view/>
				</ui-template>
				<ui-textarea v-model="row.stepExplain" label="步骤说明" style="text-align:left;" :maxlength="1000" required/>
				<ui-select v-model="row.type" label="步骤类型" width="200" required>
					<ui-option value="0" text="图文说明页"/>
					<ui-option value="1" text="链接打开页"/>
					<ui-option value="2" text="短文本提交页"/>
					<ui-option value="3" text="长文本提交页"/>
					<ui-option value="4" text="图片提交页"/>
				</ui-select>
			</ui-table>
		</ui-template>
	</ui-form>
</template>

<script>
export default {
	props:['params','close'],
	data(){
		return {
			model:{}
		};
	},
	mounted() {
		this.getDetail();
	},
	methods:{
		getDetail(){
			this.$axios.request({url:'/admin/task/'+this.params.data.id, method: 'get'})
			.then(data=>{
				this.model = data;
			}).end();
		},
	},
}
</script>

<style>
</style>