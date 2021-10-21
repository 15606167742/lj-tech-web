<template>
	<div class="com-list-content">
		<!-- <com-search :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search> -->
		<com-table ref="table" :url="'/admin/account/findMZlddList?accountId='+id+'&&changeData='+changeData" :search="condition" v-slot="{data}"
		 autolimitwidth noautobind>
			<ui-text :value="data.recordTag+data.coinVal" label="DD收支" />
			<ui-select v-model="data.changeData" label="DD类型">
				<ui-option value="1" text="MLDD" />
				<ui-option value="2" text="ZLDD" />
			</ui-select>
			<ui-select v-model="data.recordType" label="DD收支类型">
				<ui-option value="1" text="做任务收入" />
				<ui-option value="2" text="兑换礼包支出" />
				<ui-option value="3" text="投放权益DD" />
				<ui-option value="4" text="权益DD收入" />
				<ui-option value="5" text="转赠支出" />
				<ui-option value="6" text="转赠收入" />
				<ui-option value="7" text="推广加成" />
				<ui-option value="8" text="加成卡收益" />
				<ui-option value="9" text="兑换转出" />
				<ui-option value="10" text="兑换转入" />
				<ui-option value="11" text="达人分红" />
				<ui-option value="12" text="商城活动收益" />
				<ui-option value="13" text="商品购买支出" />
				<ui-option value="14" text="购买商品定比回馈" />
				<ui-option value="15" text="购买商品定额回馈" />
				<ui-option value="16" text="购买商品定额抵扣" />
				<ui-option value="17" text="商城消费积分转入到平台" />
			</ui-select>
			<ui-date v-model="data.createTime" label="创建时间" type="datetime" />
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
				id: '',
				changeData: '',
			};
		},
		activated() {
			if (this.$route.params.accountId) {
				this.id = this.$route.params.accountId;
				this.changeData = this.$route.params.changeData;
			}
		},
		methods: {}
	}
</script>

<style>
</style>
