<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.outputAccount" label="转赠方手机号" />
			<ui-text v-model="data.inputAccount" label="受赠方手机号" />
			<ui-select v-model="data.coinType" label="转赠DD类型">
				<ui-option value="1" text="MLDD" />
				<ui-option value="2" text="ZLDD" />
			</ui-select>
			<ui-date v-model="data.startTime" label="转赠开始时间" type="datetime" />
			<ui-date v-model="data.endTime" label="转赠结束时间" type="datetime" />
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/coin/giveAway/pcGiveAwayList" :search="condition" v-slot="{data}"
			:search-com="$refs.search" autolimitwidth>
			<ui-text v-model="data.zzfMobile" label="转赠方手机号" />
			<ui-text v-model="data.szfMobile" label="受赠方手机号" />
			<ui-select v-model="data.zzCoinType" label="转赠DD类型">
				<ui-option value="1" text="MLDD" />
				<ui-option value="2" text="ZLDD" />
			</ui-select>
			<ui-number v-model="data.coinVal" label="转赠DD" />
			<ui-number v-model="data.serviceChange" label="手续DD" />
			<ui-number v-model="data.coinValTotal" label="总消耗DD" />
			<ui-number :value="computePercent(data.serviceChangeRates)" label="当前手续DD率" />
			<ui-date v-model="data.createTime" label="转赠时间" type="datetime" />
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
		methods: {
			computePercent(num) {
				if (isNaN(parseFloat(num))) {
					return '-'
				} else {
					return (parseFloat(num) * 100).toFixed(2) + '%'
				}
			}
		}
	}
</script>

<style>
</style>
