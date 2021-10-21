<template>
</template>

<script>
import uiValidate from './ui-validate.vue';

export default {
	name:'ui-table',
	props:{
		data:{type:Array,default(){
			return [];
		}},
		transferData:{type:Array,default(){
			return [];
		}},
		view:{type:Boolean,default:false},
	},
	data(){
		return {
			components:[],
			errorText:''
		};
	},
	created(){
		this.validate=()=>{
			var isValid=true;
			var errorText='';
			for(var r=0;r<this.components.length;r++){
				for(var i=0;i<this.components[r].length;i++){
					let ctl=this.components[r][i];
					if(ctl.componentInstance!=null&&ctl.componentInstance.validate!=null){
						isValid=ctl.componentInstance.validate()?isValid:false;
						if(!isValid&&errorText==''){
							errorText=ctl.componentInstance.getMessage();
						}
					}
				}
			}
			this.errorText=errorText;
			return isValid;
		};
		this.$options.render = createElement => {
			
			var components=[];
			var rows=[];
			var columns=[];
			
			var slots=this.$scopedSlots.default({row:[]});
			for(var n=0;n<slots.length;n++){
				let ctl=slots[n];
				
				if(ctl.tag==null||ctl.tag.slice(-9)=='ui-hidden')
					continue;
				
				columns.push(createElement('th',{style:{width:ctl.data.attrs.width?ctl.data.attrs.width+'px':null}},ctl.data.attrs.label));
			}
			rows.push(createElement('tr',[columns]));
			
			for(var i=0;i<this.data.length;i++){
				var columns=[];
				this.data[i].$index=i;
				var slots=this.$scopedSlots.default({row:this.data[i],data:this.data[i]});
				components.push([]);
				for(var n=0;n<slots.length;n++){
					let ctl=slots[n];
					if(ctl.tag==null)
						continue;
					
					if(ctl.componentOptions.propsData==null){
						ctl.componentOptions.propsData={};
					}
					if(this.view&&ctl.data.attrs.edit==null){
						ctl.componentOptions.propsData.view=true;
					}
					else{
						ctl.componentOptions.propsData.nomessage=true;
					}
					
					if(ctl.data.model){
						var field=ctl.data.model.expression.split('.');
						ctl.field=field[field.length-1];
						components[components.length-1].push(ctl);
					}
					
					if(ctl.tag.slice(-9)!='ui-hidden')
						columns.push(createElement('td',[ctl]));
				}
				rows.push(createElement('tr',[columns]));
			}
			if(this.data.length==0){
				//rows.push(createElement('tr',[createElement('td',{class:'uimaker-empty',colspan:5},'暂无数据')]));
			}
			
			this.components=components;
			
			return createElement(uiValidate,{
				attrs:{value:this.errorText}
			},[createElement('table',{class:'uimaker-table'},rows)]);
			//return createElement('table',{class:'uimaker-table'},rows);
		};
	},
	mounted(){ },
	methods:{
		updateTransferData(){
			this.$emit('update:transferData',this.getTransferData());
		},
		getTransferData(){
			var data=[];
			for(var c=0;c<this.components.length;c++){
				var model={};
				for(var i=0;i<this.components[c].length;i++){
					var component=this.components[c][i];
					
					var isSubmit=true;
					if(component.componentOptions.propsData&&component.componentOptions.propsData.view!=undefined)
						isSubmit=false;
					if(component.data.attrs.autosubmit!=undefined){
						if(this.data[c][component.field]===''){
							isSubmit=false;
						}
						else{
							isSubmit=true;
						}
					}
					if(component.data.attrs.submit!=undefined)
						isSubmit=true;
					if(component.data.attrs.nosubmit!=undefined)
						isSubmit=false;
					
					if(isSubmit){
						model[component.field]=this.data[c][component.field];
					}
				}
				data.push(model);
			}
			return data;
		}
	}
}
</script>
<style lang="scss">
.uimaker-table{
	border-collapse:collapse;flex-grow:1;width:100%;font-size:14px;
	td,th{text-align:center;padding:5px;border: 1px solid #EBEEF5;color:#909399;}
	th{background:#FAFAFA;}
	.uimaker-empty{color:#909399}
}
.uimaker-table-add{margin-bottom:15px;}
</style>
<style scoped>

</style>