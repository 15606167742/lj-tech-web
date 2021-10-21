<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-date v-model="data.startTime" label="变动开始时间" :max="data.endTime"/>
			<ui-date v-model="data.endTime" label="变动结束时间" :min="data.startTime"/>
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/coinAmountRecord/listPage" :search="condition" v-slot="{data}" :search-com="$refs.search">
			<ui-number v-model="data.coinAmount" label="当前垒钻值" />
			<ui-date v-model="data.createTime" label="变动时间" type="datetime" />
		</com-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				search: {},
				condition: {},
			};
		},
		mounted() {},
		methods: {}
	}
</script>

<style>
</style>
