<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.account" label="手机号" />
			<ui-select v-model="data.millLevel" label="礼包等级" url="/admin/account/queryMillcardList" value-field="level" text-field="millName" required/>
			<ui-select v-model="data.millSource" label="礼包来源">
				<ui-option value="0" text="体验" />
				<ui-option value="1" text="购买" />
				<ui-option value="2" text="奖励" />
				<ui-option value="3" text="赠送(商城)" />
				<ui-option value="4" text="赠送(活动)" />
			</ui-select>
			<!-- <ui-select v-model="data.isValid" label="有效礼包">
				<ui-option value="0" text="无效礼包" />
				<ui-option value="1" text="有效礼包" />
			</ui-select> -->
			<ui-date v-model="data.startTime" label="购买开始时间" />
			<ui-date v-model="data.endTime" label="购买结束时间" />
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/mill/pcAccountMillLists" :search="condition" v-slot="{data}"
			:search-com="$refs.search" autolimitwidth>
			<!-- <ui-text v-model="data.nickName" label="昵称" /> -->
			<ui-text v-model="data.mobile" label="手机号" />
			<ui-text v-model="data.name" label="礼包名称" />
			<ui-number v-model="data.level" label="礼包等级"/>
			<ui-number v-model="data.purchaseQuantity" label="礼包数量"/>
			<ui-select v-model="data.millSource" label="礼包来源">
				<ui-option value="0" text="体验" />
				<ui-option value="1" text="购买" />
				<ui-option value="2" text="奖励" />
				<ui-option value="3" text="赠送(商城)" />
				<ui-option value="4" text="赠送(活动)" />
			</ui-select>
			<ui-select v-model="data.isActivate" label="是否激活" tag width="80">
				<ui-option value="0" text="否" tag-type="info"/>
				<ui-option value="1" text="是" tag-type="primary"/>
			</ui-select>
			<ui-number v-model="data.times" label="剩余有效次数"/>
			<ui-date :value="data.createTime?data.createTime:data.updateTime" label="购买时间" type="datetime" />
			<ui-date v-model="data.validityDate" label="有效期" type="datetime" />
			<ui-text v-model="data.remark" label="备注" />
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
