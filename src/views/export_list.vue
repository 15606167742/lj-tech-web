<template>
	<div class="com-list-content">
		<!-- <com-search :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
		</com-search> -->
		<com-table ref="table" url="/admin/exportRecord/page" :search="condition" v-slot="{data}" autolimitwidth>
			<ui-text v-model="data.fileName" label="文件名称" />
			<ui-select v-model="data.type" label="类型">
				<ui-option value="1" text="发展实名用户"/>
				<ui-option value="2" text="新购买礼包"/>
			</ui-select>
			<ui-date v-model="data.beginTime" label="开始时间" type="datetime"/>
			<ui-date v-model="data.endTime" label="结束时间" type="datetime"/>
			<ui-date v-model="data.createTime" label="创建时间" type="datetime"/>
			<!-- <ui-textarea v-model="data.remark" label="备注" /> -->
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
	mounted(){},
	methods:{}
}
</script>

<style>
</style>