<template>
	<ui-form :model="params.data" :transfer-model.sync="submitData" v-slot="{data}">
		<ui-hidden v-model="data.id" autosubmit />
		<ui-text :value="$g(data, 'account.realName')" label="姓名" view/>
		<ui-text :value="$g(data, 'account.no')" label="身份证号" view/>
		<ui-text :value="$g(data, 'account.nickName')" label="昵称" view/>
		<ui-text :value="$g(data, 'account.mobile')" label="手机号" view/>
		<ui-textarea :value="$g(data, 'account.address')" label="地址" view/>
	</ui-form>
</template>

<script>
	export default {
		props: ['params', 'close'],
		data() {
			return {
				submitData: {}
			};
		},
		mounted() {},
		methods: {},
	}
</script>

<style>
</style>
