<template>
	<div class="com-list-content">
		<com-search ref="search" :model="search" :transfer-model.sync="condition" v-slot="{data}" :table="$refs.table">
			<ui-text v-model="data.title" label="标题"/>
			<ui-date v-model="data.startTime" label="开始时间" type="datetime"/>
			<ui-date v-model="data.endTime" label="结束时间" type="datetime"/>
			<ui-template>
				<ui-button type="search"></ui-button>
				<ui-button type="add" @click="add">增加</ui-button>
			</ui-template>
		</com-search>
		<com-table ref="table" url="/admin/college/videoList" :search="condition" v-slot="{data}" :search-com="$refs.search">
			<ui-text v-model="data.title" label="标题"/>
			<ui-image v-model="data.previewPic" label="预览图" size="mini"/>
			<ui-attachment v-model="data.url" label="视频" />
			<ui-date v-model="data.createTime" label="创建时间" type="datetime"/>
			<ui-template label="操作">
				<ui-button type="edit" @click="edit(data)" />
				<ui-button type="delete" @click="remove(data)"/>
			</ui-template>
		</com-table>
		<!-- <video src="http://119.8.160.59:8889/video/17/3f/478126e2a50c4c2ba5c3267bd9340df5.mp4" controls></video> -->
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
			this.$dialog('video_detail',{type:'add',data:{}},()=>{
				this.$refs.table.refresh(true);
			})
		},
		edit(data){
			this.$dialog('video_detail',{type:'edit',data:data},()=>{
				this.$refs.table.refresh();
			})
		},
		remove(data){
			this.$axios.delete('/admin/college/deleteVideo?id='+data.id)
			.then(data=>{
				this.$refs.table.refresh();
			}).end();
		}
	}
}
</script>

<style>
</style>