<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.code" label="商品编号"/>
			<ui-text v-model="data.name" label="商品名称"/>
			<ui-select v-model="data.type" label="状态">
				<ui-option value="0" text="不生效" />
				<ui-option value="1" text="赠送积分生效" />
			</ui-select>
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="add" @click="add">增加</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/goodsConfig/page" :search="condition" v-slot="{data}" :search-com="$refs.search">
			<ui-text v-model="data.code" label="商品编号"/>
			<ui-text v-model="data.name" label="商品名称"/>
			<ui-select v-model="data.prodType" label="商品类型">
				<ui-option value="0" text="普通" />
				<ui-option value="1" text="多开卡" />
				<ui-option value="2" text="赠送礼包" />
				<ui-option value="3" text="会员卡" />
			</ui-select>
			<ui-textarea v-model="data.description" label="商品描述"/>
			<ui-number v-model="data.integralGive" label="赠送积分数量"/>
			<ui-select v-model="data.type" label="状态">
				<ui-option value="0" text="不生效" />
				<ui-option value="1" text="赠送积分生效" />
				<ui-option value="2" text="扣除积分生效" />
				<ui-option value="3" text="全部生效" />
			</ui-select>
			<ui-date v-model="data.createTime" label="创建时间" type="datetime" />
			<ui-template label="操作">
				<!-- <ui-button type="edit" @click="edit(data)" /> -->
				<ui-button type="delete" @click="remove(data)"/>
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
		add(){
			this.$dialog('goods_detail',{type:'add',data:{type:1,prodType:2}},()=>{
				this.$refs.table.refresh(true);
			})
		},
		// edit(data){
		// 	this.$dialog('goods_detail',{type:'edit',data:data},()=>{
		// 		this.$refs.table.refresh();
		// 	})
		// },
		remove(data){
			this.$axios.request({url:'/admin/goodsConfig/remove',data:{id:data.id},method:'post',urlencode:true})
			.then(data=>{
				this.$refs.table.refresh();
			}).end();
		}
	}
}
</script>

<style>
</style>