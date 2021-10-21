<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-hidden v-model="data.id" autosubmit/>
		<ui-select v-model="data.level" label="用户级别" :columns="2" view>
			<ui-option value="1" text="一星达人" />
			<ui-option value="2" text="二星达人" />
			<ui-option value="3" text="三星达人" />
			<ui-option value="4" text="四星达人" />
			<ui-option value="5" text="五星达人" />
		</ui-select>
		<ui-number v-model="data.subordinateVip" label="直推人数" view/>
		<ui-number v-model="data.subordinateMillQty" label="直推持有礼包人数" view v-if="data.level!=1"/>
		<ui-select v-model="data.subordinateLevel" label="直推持有礼包等级" required view v-if="data.level!=1">
			<ui-option value="1" text="1" />
			<ui-option value="2" text="2" />
			<ui-option value="3" text="3" />
			<ui-option value="4" text="4" />
			<ui-option value="5" text="5" />
			<ui-option value="6" text="6" />
		</ui-select>
		<ui-number v-model="data.subordinateAlg" label="总活跃度" :max="9999999.999" :precision="3" required/>
		<ui-number v-model="data.subordinatePartHashrate" label="小区活跃度" :max="9999999.999" :precision="3" required/>
		<ui-number v-model="data.avgQuota" label="DD加权分红" :min="0.001" :max="avgQuotaMax" :precision="3" required/>
		<ui-number v-model="data.avgAdQuota" label="金豆分润比例" :min="0.001" :max="avgAdQuotaMax" :precision="3" required/>
		<ui-select v-model="data.millLevel" label="奖励礼包等级" required>
			<ui-option value="1" text="1" />
			<ui-option value="2" text="2" />
			<ui-option value="3" text="3" />
			<ui-option value="4" text="4" />
			<ui-option value="5" text="5" />
			<ui-option value="6" text="6" />
		</ui-select>
		<ui-template>
			<ui-button type="submit" @submit="submit"></ui-button>
			<ui-button type="reset" v-if="params.type=='add'"></ui-button>
		</ui-template>
	</ui-form>
</template>

<script>
export default {
	props:['params','close'],
	data(){
		return {
			submitData:{},
			avgQuotaMax: 1,
			avgAdQuotaMax: 1,
		};
	},
	mounted() {
		this.$axios.get('/admin/vipUpgrade/queryVipUpgrade').then(data=>{
			data.forEach(item=>{
				if(item.id!=this.params.data.id){
					this.avgQuotaMax-=item.avgQuota;
					this.avgAdQuotaMax-=item.avgAdQuota;
				}
			})
		})
	},
	methods:{
		submit(){
			this.$axios.request({url:'/admin/vipUpgrade/updateVipUpgrade',data:this.submitData,method:this.params.type,urlencode:true})
			.then(data=>{
				this.close();
			}).end();
		},
	},
}
</script>

<style>
</style>
