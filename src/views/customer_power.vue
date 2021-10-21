<template>
	<div class="com-list-content">
		<!-- <com-search :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search> -->
		<com-table ref="table" :url="'/admin/account/findPowerRecodeList?accountId='+id" :search="condition" v-slot="{data}"
		 noautobind>
			<ui-text :value="data.recordTag+data.changeAmount" label="能量值变更" />
			<ui-select v-model="data.type" label="变更类型">
				<ui-option value="1" text="推广获赠" />
				<ui-option value="2" text="任务收益" />
				<ui-option value="3" text="兑换消耗" />
				<ui-option value="4" text="权利兑换" />
				<ui-option value="7" text="视频收益" />
			</ui-select>
			<ui-date v-model="data.createTime" label="创建时间" type="datetime" />
		</com-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				search: {},
				condition: {},
				id: '',
			};
		},
		activated() {
			if (this.$route.params.accountId) {
				this.id = this.$route.params.accountId
			}
		},
		methods: {}
	}
</script>

<style>
</style>
