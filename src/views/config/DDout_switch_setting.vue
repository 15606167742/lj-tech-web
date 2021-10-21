<template>
	<ui-form :model="info" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-switch v-model="data.status" label="配置开关" required/>
		<ui-template>
			<ui-button type="submit" @submit="submit"></ui-button>
			<ui-button type="reset" v-if="params.type=='add'"></ui-button>
		</ui-template>
	</ui-form>
</template>

<script>
	export default {
		props: ['params', 'close'],
		data() {
			return {
				info: {
					status: null,
				},
				submitData: {}
			};
		},
		mounted() {
			this.getInfo();
		},
		methods: {
			getInfo() {
				this.$axios.request({
						url: '/admin/limitConfig/queryStatus',
						method: 'get'
					})
					.then(data => {
						this.info.status = data;
					}).end();
			},
			submit() {
				this.$axios.request({
						url: '/admin/limitConfig/updateStatus',
						data: this.submitData,
						method: 'put',
						urlencode: true
					})
					.then(data => {
						this.close();
					}).end();
			}
		},
	}
</script>

<style>
</style>
