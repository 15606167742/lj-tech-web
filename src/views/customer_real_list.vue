<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.realName" label="姓名" />
			<ui-text v-model="data.mobile" label="手机号" />
			<ui-date v-model="data.startTime" label="实名开始时间" type="datetime" />
			<ui-date v-model="data.endTime" label="实名结束时间" type="datetime" />
			<ui-select v-model="data.isAuth" label="认证状态">
				<ui-option value="-1" text="未认证" />
				<ui-option value="0" text="待认证" />
				<ui-option value="1" text="认证成功" />
				<ui-option value="2" text="认证失败" />
			</ui-select>
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/account/authenRecord" :search="condition" v-slot="{data}"
			:search-com="$refs.search" :dataFormat="dataFormat" autolimitwidth>
			<ui-text v-model="data.nickName" label="昵称" :width="150" />
			<ui-text v-model="data.realName" label="姓名" :width="150" />
			<ui-text v-model="data.mobile" label="手机号" value-type="phone" />
			<ui-date v-model="data.createTime" label="认证时间" type="datetime" />
			<ui-select v-model="data.status" label="认证状态">
				<ui-option value="-1" text="未认证" />
				<ui-option value="0" text="待认证" />
				<ui-option value="1" text="认证成功" />
				<ui-option value="2" text="认证失败" />
			</ui-select>
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
			dataFormat(data) {
				data.forEach(item => {
					if (item.stopEdit) {
						item.stopEditFlag = '1';
					} else {
						item.stopEditFlag = '0';
					}
				})
				return data;
			},
		}
	}
</script>

<style>
</style>
