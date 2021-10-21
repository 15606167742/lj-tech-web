<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}" :view="params.type=='view'">
		<ui-hidden v-model="data.id" autosubmit/>
		<ui-hidden v-model="data.goodsId" autosubmit/>
		<ui-template label="商品名称" :columns="1" style="display: flex;">
			<ui-text :value="$g(data,'goodsInfo.name')" view/>
			<ui-button button-type="primary" icon="el-icon-edit-outline" style="margin-left: auto;" @click="selectGoods" v-if="params.type!='view'">选择商品</ui-button>
		</ui-template>
		<ui-text :value="$g(data,'goodsInfo.brand')" label="商品品牌" view/>
		<ui-number :value="$g(data,'goodsInfo.currentPrice')" label="DD" view/>
		<ui-select :value="$g(data,'goodsInfo.currencyType')" label="DD类型" view>
			<ui-option value="1" text="MLDD" />
			<ui-option value="2" text="ZLDD" />
		</ui-select>
		<ui-number v-model="data.goodsCount" label="商品数量" :min="1" :max="100000000" required @change="goodsCountChange" disabled/>
		<ui-template style="border-bottom: 1px dashed #eee;"></ui-template>
		<ui-select v-model="data.totalType" label="总份数类型" :columns="2" required @change="totalTypeChange">
			<ui-option value="1" text="默认总份数" />
			<ui-option value="2" text="指定总份数" />
		</ui-select>
		<template v-if="data.totalType == '1'">
			<ui-number v-model="data.unitPrice" label="单份参与DD" :min="1" :max="parseInt(data.goodsInfo.currentPrice)" required @change="computeTotal"/>
			<ui-number v-model="data.total" label="总份数" required disabled/>
			<!-- <ui-hidden v-model="data.total" autosubmit/> -->
		</template>
		<template v-if="data.totalType == '2'">
			<ui-number v-model="data.unitPrice" label="单份参与DD" :min="1" :max="parseInt(data.goodsInfo.currentPrice)" required/>
			<ui-number v-model="data.total" label="总份数" :min="data.goodsCount" :max="100000000" required/>
		</template>
		<ui-template style="border-bottom: 1px dashed #eee;"></ui-template>
		<ui-number v-model="data.numberForPurchase" label="限购份数(0不限制)" :max="1000000000" required/>
		<ui-switch v-model="data.isDesignated" label="是否选择" required/>
		<!-- <ui-richtext v-model="data.content" label="参与规则" /> -->
		<ui-select v-model="data.state" label="活动状态" v-if="params.type=='view'">
			<ui-option value="0" text="待发布" />
			<ui-option value="1" text="进行中" />
			<ui-option value="2" text="待发放" />
			<ui-option value="3" text="已完成" />
		</ui-select>
		<ui-number v-model="data.quantityPurchased" label="已购买份数" v-if="params.type=='view'"/>
		<ui-template v-if="params.type!='view'">
			<ui-button button-type="primary" icon="el-icon-suitcase" @submit="submit(0)">保存</ui-button>
			<ui-button button-type="primary" icon="el-icon-s-claim" @submit="submit(1)">发布</ui-button>
		</ui-template>
	</ui-form>
</template>

<script>
export default {
	props:['params','close'],
	data(){
		return {
			submitData:{}
		};
	},
	mounted() {
		this.$nextTick(()=>{
			if(this.params.type == 'add') {
				this.$set(this.params.data, 'numberForPurchase', 0)
				this.$set(this.params.data, 'goodsCount', 1)
			}
		})
	},
	methods:{
		selectGoods() {
			this.$dialog('loot_activity_goods', {
				data: {}
			}, (goods) => {
				this.params.data.goodsId = goods[0].id;
				this.getGoodsDetail();
			})
		},
		getGoodsDetail() {
			this.$axios.get('/admin/lucky-purchase-goods/'+this.params.data.goodsId)
			.then(data=>{
				this.$set(this.params.data, 'goodsInfo', data);
				this.$set(this.params.data, 'unitPrice', '');
				this.$set(this.params.data, 'total', '');
			}).end();
		},
		goodsCountChange() {
			if(this.params.data.totalType == '1') {
				this.computeTotal();
			}
		},
		totalTypeChange() {
			if (this.params.data.totalType && !this.params.data.goodsId) {
				this.$msgbox('请先选择一种商品');
				this.params.data.totalType = '';
				return;
			} 
			if (this.params.data.totalType == '1'){
				this.computeTotal();
			}
		},
		computeTotal() {
			let data = this.params.data;
			if (data.totalType == '1' && data.goodsId && data.goodsCount && data.goodsInfo.currentPrice && data.unitPrice) {
				if (data.goodsInfo.currentPrice*data.goodsCount%data.unitPrice==0) {
					this.params.data.total = data.goodsInfo.currentPrice*data.goodsCount/data.unitPrice;
				} else{
					this.params.data.total = '';
					this.$msgbox('无法获得合法总份数，请重新填写相关信息');
				}
			}
		},
		submit(state){
			this.submitData.state = state;
			if(this.submitData.isDesignated=='0'){
				this.submitData.isDesignated = false;
			}else{
				this.submitData.isDesignated = true;
			}
			this.$axios.request({url:'/admin/lucky-purchase-activity',data:this.submitData,method:this.params.type})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>