<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.mobile" label="手机号"/>
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="add" @click="add">增加</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/cityMaster/listPage" :search="condition" v-slot="{data}" :search-com="$refs.search" autolimitwidth>
			<ui-text v-model="data.mobile" label="手机号" value-type="phone"/>
			<ui-number v-model="data.millProfit" label="礼包产出总值"/>
			<ui-number v-model="data.bonus" label="手续费分润总值"/>
			<ui-text v-model="data.phoneAttribution" label="账号归属地"/>
			<ui-number v-model="data.subordinateCount" label="归属地人数(不包括自己)"/>
			<ui-date v-model="data.masterStartTime" label="成为城市盟主时间" type="datetime"/>
			<ui-template label="操作">
				<ui-button type="delete" @click="remove(data)" />
			</ui-template>
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
	mounted(){
	},
	methods:{
		add() {
			this.$dialog('city_leader_add', {
				type: 'add',
				data: {}
			}, () => {
				this.$refs.table.refresh(true);
			})
		},
		remove(data) {
			this.$axios.request({
					url: '/admin/cityMaster',
					params: {
						accountId: data.id,
					},
					method: 'DELETE'
				})
				.then(d => {
					this.$refs.table.refresh();
				}).end();
		},
	}
}
</script>

<style>
</style>