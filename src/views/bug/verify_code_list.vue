<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.mobile" label="手机号" />
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/public/getCodeList" :search="condition" v-slot="{data}"
			:search-com="$refs.search">
			<ui-text v-model="data.mobile" label="手机号" />
			<ui-text v-model="data.code" label="验证码" />
			<ui-date :value="$moment(data.createTime*1000).format('YYYY-MM-DD HH:mm:ss')" label="时间" type="datetime" />
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
