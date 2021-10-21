<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.name" label="商品名称"/>
			<ui-text v-model="data.brand" label="商品品牌"/>
			<ui-select v-model="data.currencyType" label="DD类型">
				<ui-option value="1" text="MLDD" />
				<ui-option value="2" text="ZLDD" />
			</ui-select>
			<ui-number v-model="data.bottomPrice" label="现价下限" />
			<ui-number v-model="data.topPrice" label="现价上限" />
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="add" @click="add">增加</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/lucky-purchase-goods/list-page" :search="condition" v-slot="{data}" :search-com="$refs.search" autolimitwidth>
			<ui-text v-model="data.name" label="商品名称"/>
			<ui-text v-model="data.brand" label="商品品牌"/>
			<ui-image v-model="data.pictureUrl" multiple label="商品图片"/>
			<ui-select v-model="data.currencyType" label="DD类型">
				<ui-option value="1" text="MLDD" />
				<ui-option value="2" text="ZLDD" />
			</ui-select>
			<!-- <ui-number v-model="data.originalPrice" label="原价" /> -->
			<ui-number v-model="data.currentPrice" label="DD" />
			<ui-date v-model="data.createTime" label="创建时间" type="datetime"/>
			<ui-template label="操作">
				<ui-button button-type="primary" icon="el-icon-view" @click="view(data)">查看</ui-button>
				<ui-button type="edit" @click="edit(data)" :disabled="!data.editable">编辑</ui-button>
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
		view(data) {
			this.$dialog('loot_goods_detail', {
				type: 'view',
				data:data
			})
		},
		add() {
			this.$dialog('loot_goods_detail', {
				type: 'add',
				data: {}
			}, () => {
				this.$refs.table.refresh(true);
			})
		},
		edit(data){
			this.$dialog('loot_goods_detail',{type:'edit',data:data},()=>{
				this.$refs.table.refresh();
			})
		},
		remove(data) {
			this.$axios.request({
					url: '/admin/lucky-purchase-goods/'+data.id,
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