<template>
	<ui-form :model="info" :transfer-model.sync="submitData" v-slot="{data}" style="width: 800px;">
		<ui-select v-model="data.method.method" label="兑换礼包消耗方式" required :view="data.method.edited?undefined:''">
			<ui-option value="0" text="默认" />
			<ui-option value="3" text="按比例消耗MLDD/ZLDD" />
		</ui-select>
		<ui-template>
			<ui-button icon="el-icon-edit" button-type="primary" @click="startEdit(data.method)" v-if="!data.method.edited">编辑</ui-button>
			<template v-else>
				<ui-button type="submit" @submit="submit3(data.method)"></ui-button>
				<ui-button button-type="info" @click="getInfo3">取消</ui-button>
			</template>
		</ui-template>
		<ui-number v-model="data.purchase.mlddRatio" label="购买礼包MLDD" :max="1" :precision="2" required :view="data.purchase.edited?undefined:''"/>
		<ui-number v-model="data.purchase.zlddRatio" label="购买礼包ZLDD" :max="1" :precision="2" required :view="data.purchase.edited?undefined:''"/>
		<ui-template>
			<ui-button icon="el-icon-edit" button-type="primary" @click="startEdit(data.purchase)" v-if="!data.purchase.edited">编辑</ui-button>
			<template v-else>
				<ui-button type="submit" @submit="submit1(data.purchase)"></ui-button>
				<ui-button button-type="info" @click="getInfo1">取消</ui-button>
			</template>
		</ui-template>
		<ui-number v-model="data.profit.mRatio" label="任务收益MLDD" :max="1" :precision="2" required :view="data.profit.edited?undefined:''"/>
		<ui-number v-model="data.profit.zRatio" label="任务收益ZLDD" :max="1" :precision="2" required :view="data.profit.edited?undefined:''"/>
		<ui-template>
			<ui-button icon="el-icon-edit" button-type="primary" @click="startEdit(data.profit)" v-if="!data.profit.edited">编辑</ui-button>
			<template v-else>
				<ui-button type="submit" @submit="submit2(data.profit)"></ui-button>
				<ui-button button-type="info" @click="getInfo2">取消</ui-button>
			</template>
		</ui-template>
		<!-- <ui-number v-model="data.service.service" label="城市盟主手续费分润比例" :max="1" :precision="3" required :view="data.service.edited?undefined:''"/>
		<ui-template>
			<ui-button icon="el-icon-edit" button-type="primary" @click="startEdit(data.service)" v-if="!data.service.edited">编辑</ui-button>
			<template v-else>
				<ui-button type="submit" @submit="submit4(data.service)"></ui-button>
				<ui-button button-type="info" @click="getInfo4">取消</ui-button>
			</template>
		</ui-template> -->
		<ui-number v-model="data.gift.gift" label="城市盟主礼包产出比例" :max="1" :precision="3" required :view="data.gift.edited?undefined:''"/>
		<ui-template>
			<ui-button icon="el-icon-edit" button-type="primary" @click="startEdit(data.gift)" v-if="!data.gift.edited">编辑</ui-button>
			<template v-else>
				<ui-button type="submit" @submit="submit5(data.gift)"></ui-button>
				<ui-button button-type="info" @click="getInfo5">取消</ui-button>
			</template>
		</ui-template>
	</ui-form>
</template>

<script>
export default {
	data(){
		return {
			info:{
				purchase: {
					mlddRatio: null,
					zlddRatio: null,
					edited: false,
				},
				profit: {
					mRatio: null,
					zRatio: null,
					edited: false,
				},
				method: {
					method: null,
					edited: false,
				},
				// service: {
				// 	service: null,
				// 	edited: false,
				// },
				gift: {
					gift: null,
					edited: false,
				}
			},
			submitData:{}
		};
	},
	mounted() {
		this.getInfo1();
		this.getInfo2();
		this.getInfo3();
		// this.getInfo4();
		this.getInfo5();
	},
	methods:{
		getInfo1() {
			this.$axios.request({url:'/admin/mill/getMillRatio', method: 'get'})
			.then(data=>{
				this.info.purchase.mlddRatio = data.mlddRatio;
				this.info.purchase.zlddRatio = data.zlddRatio;
				this.info.purchase.edited = false;
			}).end();
		},
		getInfo2() {
			this.$axios.request({url:'/admin/mill/getTaskRatio', method: 'get'})
			.then(data=>{
				this.info.profit.mRatio = data.mRatio;
				this.info.profit.zRatio = data.zRatio;
				this.info.profit.edited = false;
			}).end();
		},
		getInfo3() {
			this.$axios.request({url:'/admin/mill/getPayMethod', method: 'get'})
			.then(data=>{
				this.info.method.method = data;
				this.info.method.edited = false;
			}).end();
		},
		// getInfo4() {
		// 	this.$axios.request({url:'/admin/cityLeader/getChargeProfit', method: 'get'})
		// 	.then(data=>{
		// 		this.info.service.service = data;
		// 		this.info.service.edited = false;
		// 	}).end();
		// },
		getInfo5() {
			this.$axios.request({url:'/admin/cityLeader/getCoinProfit', method: 'get'})
			.then(data=>{
				this.info.gift.gift = data;
				this.info.gift.edited = false;
			}).end();
		},
		startEdit(obj){
			obj.edited = true;
		},
		submit1(purchase){
			if (purchase.mlddRatio + purchase.zlddRatio != 1) {
				this.$alert('比例和必须为1！')
				return
			}
			this.$axios.request({url:'/admin/mill/setMillRatio',data:purchase,method:'put',urlencode:true})
			.then(data=>{
				this.getInfo1();
			}).end();
		},
		submit2(profit){
			if (profit.mRatio + profit.zRatio != 1) {
				this.$alert('比例和必须为1！')
				return
			}
			this.$axios.request({url:'/admin/mill/setTaskRatio',data:profit,method:'put',urlencode:true})
			.then(data=>{
				this.getInfo2();
			}).end();
		},
		submit3(method){
			this.$axios.request({url:'/admin/mill/setPayMethod',data:method,method:'put',urlencode:true})
			.then(data=>{
				this.getInfo3();
			}).end();
		},
		// submit4(service){
		// 	this.$axios.request({url:'/admin/cityLeader/setChargeProfit',data:{profitRate: service.service},method:'put',urlencode:true})
		// 	.then(data=>{
		// 		this.getInfo4();
		// 	}).end();
		// },
		submit5(gift){
			this.$axios.request({url:'/admin/cityLeader/setCoinProfit',data:{profitRate: gift.gift},method:'put',urlencode:true})
			.then(data=>{
				this.getInfo5();
			}).end();
		}
	},
}
</script>

<style>
</style>