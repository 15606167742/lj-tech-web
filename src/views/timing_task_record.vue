<template>
	<div class="com-list-content">
		<com-table ref="table" url="/admin/dateStatistic/dispathcLog" :search="condition" v-slot="{data}">
			<ui-select v-model="data.type" label="类别">
				<ui-option value="1" text="持久化个人阅读数量"/>
				<ui-option value="2" text="每天计算一次领哆哆的用户等级"/>
				<ui-option value="3" text="每天定时发放权益池收益"/>
				<ui-option value="4" text="重新计算星达人等级"/>
				<ui-option value="5" text="发放礼包收益"/>
				<ui-option value="6" text="达人加权分红"/>
				<ui-option value="7" text="加成卡发放"/>
				<ui-option value="8" text="加成卡收益发放"/>
				<ui-option value="9" text="每天重置能量值上限"/>
				<ui-option value="10" text="释放金豆到活动账户"/>
				<ui-option value="11" text="每日数据统计"/>
				<ui-option value="12" text="发放推广加成"/>
			</ui-select>
			<ui-textarea v-model="data.description" label="执行功能"/>
			<ui-date v-model="data.createTime" label="调度开始时间" type="datetime"/>
			<ui-select v-model="data.status" label="状态">
				<ui-option value="1" text="调度中"/>
				<ui-option value="2" text="调度完成"/>
				<ui-option value="3" text="调度失败"/>
			</ui-select>
			<ui-date v-model="data.updateTime" label="状态更改时间" type="datetime"/>
		</com-table>
	</div>
</template>

<script>
export default {
	data(){
		return {
			search:{},
			condition:{},
		};
	},
	methods:{}
}
</script>

<style>
</style>
