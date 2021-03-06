import store from '@/store'

export default {
	uimaker:{
		'ui-text':{
			maxlength:64
		},
		'ui-textarea':{
			maxlength:200
		},
		'ui-select':{
			stringValue:true,
			pageFields(){
				return {page:'page',rows:'rows'};
			}
		},
		'ui-attachment':{
			uploadPath: '/admin/upload/file',
			filePath:'',
			responseValueField: 'data.url',
			responseError(response){
				return response.status!=200;
			}
		},
		'ui-image':{
			uploadPath: '/admin/upload/image',
			responseValueField: 'data.url',
			responseError(response){
				return response.status!=200;
			},
		},
		'ui-richtext':{
			uploadPath: '/admin/upload/file',
			responseValueField: 'data.url',
			responseError(response){
				return response.status!=200;
			},
		}
	},
	commonui:{
		'com-dialog':{
			draggable:false
		},
		'com-search':{
			updateModelTrigger:'change',
			pageFields(){
				return {page:'page',rows:'rows'};
			}
		},
		'com-table':{
			indexColumn:true,
			pageFields(){
				return {page:'page',rows:'rows'};
			}
		},
	},
	permission:{
		props:{name:'code',children:'children'}
	}
}