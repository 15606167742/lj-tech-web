<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.activityCode" label="活动编号" />
			<ui-select v-model="data.isDesignated" label="是否选择">
				<ui-option value="0" text="否" />
				<ui-option value="1" text="是" />
			</ui-select>
			<ui-select v-model="data.state" label="活动状态">
				<ui-option value="0" text="待发布" />
				<ui-option value="1" text="进行中" />
				<ui-option value="2" text="待发放" />
				<ui-option value="3" text="已完成" />
			</ui-select>
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="add" @click="add">增加</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/lucky-purchase-activity/list-page" :search="condition" v-slot="{data}" :search-com="$refs.search" autolimitwidth>
			<ui-text v-model="data.activityCode" label="活动编号" />
			<ui-text :value="$g(data,'goodsInfo.name')" label="商品名称"/>
			<ui-number v-model="data.unitPrice" label="单份参与DD"/>
			<ui-number v-model="data.total" label="总份数"/>
			<ui-switch v-model="data.isDesignated" label="是否选择"/>
			<ui-select v-model="data.state" label="活动状态">
				<ui-option value="0" text="待发布" />
				<ui-option value="1" text="进行中" />
				<ui-option value="2" text="待发放" />
				<ui-option value="3" text="已完成" />
			</ui-select>
			<ui-template label="活动进度">
				<el-progress :percentage="parseFloat((data.quantityPurchased/data.total*100).toFixed(2))"></el-progress>
			</ui-template>
			<!-- <ui-text :value="data.quantityPurchased+'/'+data.total" label="活动进度" /> -->
			<ui-number :value="$g(data,'goodsInfo.currentPrice')" label="DD"/>
			<ui-number v-model="data.goodsCount" label="商品数量"/>
			<ui-select :value="$g(data,'goodsInfo.currencyType')" label="DD类型">
				<ui-option value="1" text="MLDD" />
				<ui-option value="2" text="ZLDD" />
			</ui-select>
			<!-- <ui-text v-model="data.mobile" label="中奖号码" /> -->
			<ui-text v-model="data.winningNumber" label="中奖编号" />
			<ui-template label="操作">
				<ui-button button-type="primary" icon="el-icon-view" @click="view(data)">查看</ui-button>
				<ui-button type="edit" @click="edit(data)" :disabled="data.state!='0'">编辑</ui-button>
				<ui-button button-type="warning" icon="el-icon-sold-out" @click="offShelf(data)" confirm="确定下架该商品吗？" :disabled="data.state!='1'&&data.state!='2'">下架</ui-button>
				<ui-button type="delete" @click="remove(data)" :disabled="data.state!='0'"/>
				<ui-button button-type="warning" icon="el-icon-receiving" @click="bug(data)" :disabled="!data.isDesignated || !['1', '2'].find(t=>t==data.state)">选择</ui-button>
				<ui-button button-type="success" icon="el-icon-present" @click="winner(data)" :disabled="data.state=='0'">查询中奖信息</ui-button>
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
		view(data) {
			this.$dialog('loot_activity_detail', {
				type: 'view',
				data:data
			})
		},
		add() {
			this.$dialog('loot_activity_detail', {
				type: 'add',
				data: {}
			}, () => {
				this.$refs.table.refresh(true);
			})
		},
		edit(data){
			this.$dialog('loot_activity_detail',{type:'edit',data:data},()=>{
				this.$refs.table.refresh();
			})
		},
		offShelf(data){
			this.$axios.request({
					url: '/admin/lucky-purchase-activity/withdraw/'+data.id,
					method: 'PUT'
				})
				.then(d => {
					this.$refs.table.refresh();
				}).end();
		},
		remove(data) {
			this.$axios.request({
					url: '/admin/lucky-purchase-activity/'+data.id,
					method: 'DELETE'
				})
				.then(d => {
					this.$refs.table.refresh();
				}).end();
		},
		bug(data){
			this.$dialog('loot_activity_bug',{data},()=>{
				this.$refs.table.refresh();
			})
		},
		winner(data){
			this.$dialog('loot_activity_winner',{data},()=>{
				this.$refs.table.refresh();
			})
		},
	}
}
</script>

<style>
</style>