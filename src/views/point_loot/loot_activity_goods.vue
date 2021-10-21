<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.name" label="商品名称" />
			<ui-text v-model="data.brand" label="商品品牌" />
			<ui-select v-model="data.currencyType" label="货币类型">
				<ui-option value="1" text="MLDD" />
				<ui-option value="2" text="ZLDD" />
			</ui-select>
			<ui-template>
				<ui-button type="search"></ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/lucky-purchase-goods/list-page" :search="condition" v-slot="{data}"
			:search-com="$refs.search" style="height: 500px;" autolimitwidth selection-column @selection-change="goodsSelectionChange">
			<ui-text v-model="data.name" label="商品名称" />
			<ui-text v-model="data.brand" label="商品品牌" />
			<ui-image v-model="data.pictureUrl" multiple label="商品图片" />
			<ui-select v-model="data.currencyType" label="货币类型">
				<ui-option value="1" text="MLDD" />
				<ui-option value="2" text="ZLDD" />
			</ui-select>
			<ui-number v-model="data.originalPrice" label="原价" />
			<ui-number v-model="data.currentPrice" label="现价" />
			<ui-date v-model="data.createTime" label="创建时间" type="datetime" />
		</com-table>
		<ui-button button-type="primary" icon="el-icon-check" style="width: 200px;align-self: flex-end;margin-top: 20px;" @click="check">确定</ui-button>
	</div>
</template>

<script>
	export default {
		props: ['params', 'close'],
		data() {
			return {
				search: {},
				condition: {},
				goods: [],
			};
		},
		methods: {
			goodsSelectionChange(rows){
				this.goods=rows;
			},
			check() {
				if(this.goods.length!=1){
					this.$msgbox('请选择一种商品');
					return;
				}
				this.close(this.goods);
			}
		}
	}
</script>

<style>
</style>
