import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout'
import RouterView from '@/views/routerview'

Vue.use(Router)

export const staticRouters = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login'),
		meta:{noauth:true}
	},
	{ path: '*', redirect: '/login' }
];


export const dynamicRouters = [
{
	path: '/',
	component: Layout,
	hiddens: {
		'password_detail': () => import('@/views/first/password_detail'),
	},
	children: [
		{
			path: 'first',
			name: 'first',
			component: () => import('@/views/first'),
			meta: {title: '首页',icon: 'odometer'},
		},
		// {
		// 	path: 'task_provider_list',
		// 	name: 'task_provider_list',
		// 	component: () => import('@/views/task_provider_list'),
		// 	hiddens:{
		// 		'task_provider_detail': () => import('@/views/task_provider_detail'),
		// 	},
		// 	meta: { title: '任务商管理', icon: 'document'}
		// },
		// {
		// 	path: 'operator',
		// 	meta: {title: '运营商管理', icon: 'folder'},
		// 	component: RouterView,
		// 	children: [
		// 		{
		// 			path: 'operator_examine',
		// 			name: 'operator_examine',
		// 			component: () => import('@/views/operator/operator_examine'),
		// 			hiddens:{
		// 				'operator_examine_detail': () => import('@/views/operator/operator_examine_detail'),
		// 				'operator_sendInfo': () => import('@/views/operator/operator_sendInfo'),
		// 			},
		// 			meta: { title: '运营商审核', icon: 'document'}
		// 		},
		// 		{
		// 			path: 'operator_team',
		// 			name: 'operator_team',
		// 			component: () => import('@/views/operator/operator_team'),
		// 			meta: { title: '团队查看', icon: 'document',nofirstload:true},
		// 			hidden:true,static:true
		// 		},
		// 		{
		// 			path: 'operator_list',
		// 			name: 'operator_list',
		// 			component: () => import('@/views/operator/operator_list'),
		// 			hiddens:{
		// 				'operator_agreement': () => import('@/views/operator/operator_agreement'),
		// 			},
		// 			meta: { title: '运营商管理', icon: 'document'}
		// 		},
		// 		{
		// 			path: 'operator_coinProfit',
		// 			name: 'operator_coinProfit',
		// 			component: () => import('@/views/operator/operator_coinProfit'),
		// 			meta: { title: '运营商垒钻收益明细', icon: 'document',nofirstload:true},
		// 			hidden:true,static:true
		// 		},
		// 		{
		// 			path: 'operator_profit',
		// 			name: 'operator_profit',
		// 			component: () => import('@/views/operator/operator_profit'),
		// 			meta: { title: '运营商收益明细', icon: 'document',nofirstload:true},
		// 			hidden:true,static:true
		// 		},
		// 	]
		// },
		{
			path: 'customer_list',
			name: 'customer_list',
			component: () => import('@/views/customer_list'),
			hiddens:{
				'customer_tip': () => import('@/views/customer_tip'),
				'customer_disable': () => import('@/views/customer_disable'),
				'customer_add': () => import('@/views/customer_add'),
				// 'customer_detail': () => import('@/views/customer_detail'),
			},
			meta: { title: '领哆哆用户管理', icon: 'document'}
		},
		{
			path: 'account_list',
			name: 'account_list',
			component: () => import('@/views/account_list'),
			hiddens:{
				'account_export': () => import('@/views/account_export'),
				// 'account_activity': () => import('@/views/account_activity'),
				'account_phone': () => import('@/views/account_phone'),
				'account_point': () => import('@/views/account_point'),
				'account_power': () => import('@/views/account_power'),
				'account_virtual_activity': () => import('@/views/account_virtual_activity'),
			},
			meta: { title: '用户信息管理', icon: 'document'}
		},
		{
			path: 'city_leader',
			name: 'city_leader',
			component: () => import('@/views/city_leader'),
			hiddens:{
				'city_leader_add': () => import('@/views/city_leader_add'),
			},
			meta: { title: '城市盟主', icon: 'document'}
		},
		{
			path: 'customer_real_list',
			name: 'customer_real_list',
			component: () => import('@/views/customer_real_list'),
			meta: { title: '用户实名记录', icon: 'document'}
		},
		{
			path: 'customer_team',
			name: 'customer_team',
			component: () => import('@/views/customer_team'),
			meta: { title: '好友列表', icon: 'document',nofirstload:true},
			hidden:true,static:true
		},
		{
			path: 'customer_dailyData',
			name: 'customer_dailyData',
			component: () => import('@/views/customer_dailyData'),
			meta: { title: '每日数据', icon: 'document',nofirstload:true},
			hidden:true,static:true
		},
		// {
		// 	path: 'customerHK_list',
		// 	name: 'customerHK_list',
		// 	component: () => import('@/views/customerHK_list'),
		// 	meta: { title: '海客用户管理', icon: 'document'}
		// },
		// {
		// 	path: 'customer_point',
		// 	name: 'customer_point',
		// 	component: () => import('@/views/customer_point'),
		// 	meta: { title: '用户DD明细', icon: 'document',nofirstload:true},
		// 	hidden:true,static:true
		// },
		{
			path: 'account_point_view',
			name: 'account_point_view',
			component: () => import('@/views/account_point_view'),
			meta: { title: '用户DD明细', icon: 'document',nofirstload:true},
			hidden:true,static:true
		},
		{
			path: 'customer_point',
			name: 'customer_point',
			component: () => import('@/views/customer_point'),
			meta: { title: '用户MZLDD明细', icon: 'document',nofirstload:true},
			hidden:true,static:true
		},
		{
			path: 'customer_power',
			name: 'customer_power',
			component: () => import('@/views/customer_power'),
			meta: { title: '用户能量值明细', icon: 'document',nofirstload:true},
			hidden:true,static:true
		},
		{
			path: 'customer_reel',
			name: 'customer_reel',
			component: () => import('@/views/customer_reel'),
			meta: { title: '用户礼包明细', icon: 'document',nofirstload:true},
			hidden:true,static:true
		},
		{
			path: 'customer_bean',
			name: 'customer_bean',
			component: () => import('@/views/customer_bean'),
			meta: { title: '用户金豆明细', icon: 'document',nofirstload:true},
			hidden:true,static:true
		},
		{
			path: 'customer_balance',
			name: 'customer_balance',
			component: () => import('@/views/customer_balance'),
			meta: { title: '用户余额明细', icon: 'document',nofirstload:true},
			hidden:true,static:true
		},
		// {
		// 	path: 'customer_coinProfit',
		// 	name: 'customer_coinProfit',
		// 	component: () => import('@/views/customer_coinProfit'),
		// 	meta: { title: '用户垒钻收益明细', icon: 'document',nofirstload:true},
		// 	hidden:true,static:true
		// },
		{
			path: 'customer_profit',
			name: 'customer_profit',
			component: () => import('@/views/customer_profit'),
			meta: { title: '用户收益明细', icon: 'document',nofirstload:true},
			hidden:true,static:true
		},
		{
			path: 'task',
			meta: {title: '任务管理', icon: 'folder'},
			component: RouterView,
			children: [
				// {
				// 	path: 'task_launch_list',
				// 	name: 'task_launch_list',
				// 	component: () => import('@/views/task/task_launch_list'),
				// 	hiddens:{
				// 		'task_launch_detail': () => import('@/views/task/task_launch_detail'),
				// 	},
				// 	meta: { title: '投放列表', icon: 'document'}
				// },
				// {
				// 	path: 'task_user_comList',
				// 	name: 'task_user_comList',
				// 	component: () => import('@/views/task/task_user_comList'),
				// 	meta: { title: '用户任务完成详情', icon: 'document'}
				// },
				// {
				// 	path: 'task_user_videoList',
				// 	name: 'task_user_videoList',
				// 	component: () => import('@/views/task/task_user_videoList'),
				// 	meta: { title: '简单任务完成详情', icon: 'document'}
				// },
				// {
				// 	path: 'easytask_user_list',
				// 	name: 'easytask_user_list',
				// 	component: () => import('@/views/task/easytask_user_list'),
				// 	meta: { title: '极简单任务完成详情', icon: 'document'}
				// },
				// {
				// 	path: 'yuwanbox_user_list',
				// 	name: 'yuwanbox_user_list',
				// 	component: () => import('@/views/task/yuwanbox_user_list'),
				// 	meta: { title: '鱼丸盒子完成详情', icon: 'document'}
				// },
				// {
				// 	path: 'task_launch_comList',
				// 	name: 'task_launch_comList',
				// 	component: () => import('@/views/task/task_launch_comList'),
				// 	meta: { title: '完成详情', icon: 'document',nofirstload:true},
				// 	hidden:true,static:true
				// },
				{
					path: 'xiyu_task_list',
					name: 'xiyu_task_list',
					component: () => import('@/views/task/xiyu_task_list'),
					meta: { title: '西域任务记录', icon: 'document'}
				},
				// {
				// 	path: 'task_list',
				// 	name: 'task_list',
				// 	component: () => import('@/views/task/task_list'),
				// 	hiddens:{
				// 		'task_edit': () => import('@/views/task/task_edit'),
				// 		'task_detail': () => import('@/views/task/task_detail'),
				// 		'task_video': () => import('@/views/task/task_video'),
				// 	},
				// 	meta: { title: '任务列表', icon: 'document'}
				// },
				// {
				// 	path: 'task_type_list',
				// 	name: 'task_type_list',
				// 	component: () => import('@/views/task/task_type_list'),
				// 	hiddens:{
				// 		'task_type_detail': () => import('@/views/task/task_type_detail'),
				// 	},
				// 	meta: { title: '任务分类', icon: 'document'}
				// },
			]
		},
		// {
		// 	path: 'currency',
		// 	meta: {title: '垒钻管理', icon: 'folder'},
		// 	component: RouterView,
		// 	children: [
		// 		{
		// 			path: 'coin_change_consumer_record_list',
		// 			name: 'coin_change_consumer_record_list',
		// 			component: () => import('@/views/currency/coin_change_consumer_record_list'),
		// 			meta: { title: '用户垒钻变动记录', icon: 'document'}
		// 		},
		// 		{
		// 			path: 'coin_change_provider_record_list',
		// 			name: 'coin_change_provider_record_list',
		// 			component: () => import('@/views/currency/coin_change_provider_record_list'),
		// 			meta: { title: '任务商垒钻变动记录', icon: 'document'}
		// 		},
		// 		/*{
		// 			path: 'coin_amount_record_list',
		// 			name: 'coin_amount_record_list',
		// 			component: () => import('@/views/currency/coin_amount_record_list'),
		// 			meta: { title: '垒钻值变化记录', icon: 'document'}
		// 		},*/
		// 	]
		// },
		{
			path: 'finance',
			meta: {title: '财务管理', icon: 'folder'},
			component: RouterView,
			children: [
				// {
				// 	path: 'withdrawal_online_list',
				// 	name: 'withdrawal_online_list',
				// 	component: () => import('@/views/finance/withdrawal_online_list'),
				// 	hiddens:{
				// 		'withdrawal_online_export': () => import('@/views/finance/withdrawal_online_export'),
				// 	},
				// 	meta: { title: '线上服务费提现审核', icon: 'document'}
				// },
				{
					path: 'withdrawal_task_list',
					name: 'withdrawal_task_list',
					component: () => import('@/views/finance/withdrawal_task_list'),
					hiddens:{
						'withdrawal_task_export': () => import('@/views/finance/withdrawal_task_export'),
					},
					meta: { title: '提现审核', icon: 'document'}
				},
				// {
				// 	path: 'withdrawal_balance_list',
				// 	name: 'withdrawal_balance_list',
				// 	component: () => import('@/views/finance/withdrawal_balance_list'),
				// 	hiddens:{
				// 		'withdrawal_balance_detail': () => import('@/views/finance/withdrawal_balance_detail'),
				// 	},
				// 	meta: { title: '任务商余额提现审核', icon: 'document'}
				// },
				{
					path: 'withdrawal_detail',
					name: 'withdrawal_detail',
					component: () => import('@/views/finance/withdrawal_detail'),
					hidden:true,static:true
				},
				// {
				// 	path: 'withdrawal_offline_list',
				// 	name: 'withdrawal_offline_list',
				// 	component: () => import('@/views/finance/withdrawal_offline_list'),
				// 	hiddens:{
				// 		'withdrawal_offline_detail': () => import('@/views/finance/withdrawal_offline_detail'),
				// 	},
				// 	meta: { title: '线下服务费提现', icon: 'document'}
				// },
				// {
				// 	path: 'withdrawal_provider_offline_list',
				// 	name: 'withdrawal_provider_offline_list',
				// 	component: () => import('@/views/finance/withdrawal_provider_offline_list'),
				// 	hiddens:{
				// 		'withdrawal_provider_offline_detail': () => import('@/views/finance/withdrawal_provider_offline_detail'),
				// 	},
				// 	meta: { title: '线下供应商服务费提现', icon: 'document'}
				// },
				// {
				// 	path: 'recharge',
				// 	name: 'recharge',
				// 	component: () => import('@/views/finance/recharge'),
				// 	hiddens:{
				// 		'recharge_examine': () => import('@/views/finance/recharge_examine'),
				// 	},
				// 	meta: { title: '任务商充值审核', icon: 'document'}
				// },
				{
					path: 'balance_change_record',
					name: 'balance_change_record',
					component: () => import('@/views/finance/balance_change_record'),
					meta: { title: '用户余额变动记录', icon: 'document'}
				},
				// {
				// 	path: 'balance_change_provider_record',
				// 	name: 'balance_change_provider_record',
				// 	component: () => import('@/views/finance/balance_change_provider_record'),
				// 	meta: { title: '任务商余额变动记录', icon: 'document'}
				// },
			]
		},
		{
			path: 'shopping',
			meta: {title: '购物商城', icon: 'folder'},
			component: RouterView,
			children: [
				{
					path:'goods_list',
					name:'goods_list',
					component: () => import('@/views/shopping/goods_list'),
					hiddens:{
						'goods_detail': () => import('@/views/shopping/goods_detail')
					},
					meta:{title:'商品DD配置',icon:'document'}
				},
				{
					path:'one_more_list',
					name:'one_more_list',
					component: () => import('@/views/shopping/one_more_list'),
					hiddens:{
						'one_more_detail': () => import('@/views/shopping/one_more_detail')
					},
					meta:{title:'一机多号配置',icon:'document'}
				},
			]
		},
		{
			path: 'college',
			meta: {title: '商学院', icon: 'folder'},
			component: RouterView,
			children: [
				{
					path:'type_list',
					name:'type_list',
					component: () => import('@/views/college/type_list'),
					hiddens:{
						'type_detail': () => import('@/views/college/type_detail')
					},
					meta:{title:'类别管理',icon:'document'}
				},
				{
					path:'article_list',
					name:'article_list',
					component: () => import('@/views/college/article_list'),
					hiddens:{
						'article_detail': () => import('@/views/college/article_detail')
					},
					meta:{title:'文章管理',icon:'document'}
				},
				// {
				// 	path:'link_list',
				// 	name:'link_list',
				// 	component: () => import('@/views/college/link_list'),
				// 	hiddens:{
				// 		'link_detail': () => import('@/views/college/link_detail')
				// 	},
				// 	meta:{title:'链接管理',icon:'document'}
				// },
				{
					path:'video_list',
					name:'video_list',
					component: () => import('@/views/college/video_list'),
					hiddens:{
						'video_detail': () => import('@/views/college/video_detail')
					},
					meta:{title:'视频管理',icon:'document'}
				},
			]
		},
		{
			path: 'point_loot',
			meta: {title: '积分夺宝', icon: 'folder'},
			component: RouterView,
			children: [
				{
					path: 'loot_goods_list',
					name: 'loot_goods_list',
					component: () => import('@/views/point_loot/loot_goods_list'),
					hiddens:{
						'loot_goods_detail': () => import('@/views/point_loot/loot_goods_detail'),
					},
					meta: { title: '积分夺宝商品', icon: 'document'}
				},
				{
					path: 'loot_activity_list',
					name: 'loot_activity_list',
					component: () => import('@/views/point_loot/loot_activity_list'),
					hiddens:{
						'loot_activity_detail': () => import('@/views/point_loot/loot_activity_detail'),
						'loot_activity_goods': () => import('@/views/point_loot/loot_activity_goods'),
						'loot_activity_bug': () => import('@/views/point_loot/loot_activity_bug'),
						'loot_activity_winner': () => import('@/views/point_loot/loot_activity_winner'),
					},
					meta: { title: '积分夺宝活动', icon: 'document'}
				},
			],
		},
		// {
		// 	path: 'fund_pool_list',
		// 	name: 'fund_pool_list',
		// 	component: () => import('@/views/fund_pool_list'),
		// 	hiddens:{
		// 		'fund_pool_detail': () => import('@/views/fund_pool_detail'),
		// 	},
		// 	meta: { title: '数据往来', icon: 'document'}
		// },
		{
			path: 'export_list',
			name: 'export_list',
			component: () => import('@/views/export_list'),
			meta: { title: '导出记录', icon: 'document'}
		},
		{
			path: 'point_transfer_record',
			name: 'point_transfer_record',
			component: () => import('@/views/point_transfer_record'),
			meta: { title: 'DD转赠台账记录', icon: 'document'}
		},
		{
			path: 'point_inout_record',
			name: 'point_inout_record',
			component: () => import('@/views/point_inout_record'),
			meta: { title: 'DD转入转出记录', icon: 'document'},
		},
		{
			path: 'reel_change_record',
			name: 'reel_change_record',
			component: () => import('@/views/reel_change_record'),
			meta: { title: '用户礼包台账记录', icon: 'document'}
		},
		{
			path:'payment_manage',
			name:'payment_manage',
			component: () => import('@/views/payment_manage'),
			meta:{title:'支付管理',icon:'document'}
		},
		{
			path:'timing_task_record',
			name:'timing_task_record',
			component: () => import('@/views/timing_task_record'),
			meta:{title:'定时任务日志',icon:'document'}
		},
		{
			path: 'cs',
			meta: {title: '客服相关', icon: 'folder'},
			component: RouterView,
			children: [
				{
					path: 'message_list',
					name: 'message_list',
					component: () => import('@/views/cs/message_list'),
					hiddens:{
						'message_detail': () => import('@/views/cs/message_detail'),
						'message_reply': () => import('@/views/cs/message_reply'),
					},
					meta: { title: '留言反馈', icon: 'document'}
				},
				{
					path: 'message_type_list',
					name: 'message_type_list',
					component: () => import('@/views/cs/message_type_list'),
					hiddens:{
						'message_type_detail': () => import('@/views/cs/message_type_detail'),
					},
					meta: { title: '留言反馈类型', icon: 'document'}
				},
			],
		},
		{
			path: 'app',
			meta: {title: 'APP管理', icon: 'folder'},
			component: RouterView,
			children: [
				{
					path: 'swiper_list',
					name: 'swiper_list',
					component: () => import('@/views/app/swiper_list'),
					hiddens:{
						'swiper_detail': () => import('@/views/app/swiper_detail'),
					},
					meta: { title: '轮播图管理', icon: 'document'}
				},
				{
					path:'app_notice_swiper',
					name:'app_notice_swiper',
					component: () => import('@/views/app/app_notice_swiper'),
					meta:{title:'APP公告',icon:'document'}
				},
				{
					path:'app_notice_pop',
					name:'app_notice_pop',
					component: () => import('@/views/app/app_notice_pop'),
					meta:{title:'APP弹窗公告',icon:'document'}
				},
				{
					path:'app_edition_list',
					name:'app_edition_list',
					component: () => import('@/views/app/app_edition_list'),
					hiddens:{
						'app_edition_detail': () => import('@/views/app/app_edition_detail')
					},
					meta:{title:'APP版本管理',icon:'document'}
				},
				{
					path:'select_recommendation_list',
					name:'select_recommendation_list',
					component: () => import('@/views/app/select_recommendation_list'),
					hiddens:{
						'select_recommendation_detail': () => import('@/views/app/select_recommendation_detail')
					},
					meta:{title:'精选推荐',icon:'document'}
				},
				{
					path:'healthy_consult_list',
					name:'healthy_consult_list',
					component: () => import('@/views/app/healthy_consult_list'),
					hiddens:{
						'healthy_consult_detail': () => import('@/views/app/healthy_consult_detail')
					},
					meta:{title:'健康资讯',icon:'document'}
				},
				{
					path:'healthy_type_list',
					name:'healthy_type_list',
					component: () => import('@/views/app/healthy_type_list'),
					hiddens:{
						'healthy_type_detail': () => import('@/views/app/healthy_type_detail')
					},
					meta:{title:'健康资讯类别',icon:'document'}
				},
				{
					path:'older_wisdom_list',
					name:'older_wisdom_list',
					component: () => import('@/views/app/older_wisdom_list'),
					hiddens:{
						'older_wisdom_detail': () => import('@/views/app/older_wisdom_detail')
					},
					meta:{title:'智慧养老',icon:'document'}
				},
				{
					path:'older_type_list',
					name:'older_type_list',
					component: () => import('@/views/app/older_type_list'),
					hiddens:{
						'older_type_detail': () => import('@/views/app/older_type_detail')
					},
					meta:{title:'智慧养老类别',icon:'document'}
				},
				// {
				// 	path:'smart_pension_setting',
				// 	name:'smart_pension_setting',
				// 	component: () => import('@/views/app/smart_pension_setting'),
				// 	meta:{title:'智慧养老配置',icon:'document'}
				// },
				{
					path:'service_code_setting',
					name:'service_code_setting',
					component: () => import('@/views/app/service_code_setting'),
					meta:{title:'客服二维码',icon:'document'}
				},
			]
		},
		// {
		// 	path:'dividend_ratio_list',
		// 	name:'dividend_ratio_list',
		// 	component: () => import('@/views/dividend_ratio_list'),
		// 	hiddens:{
		// 		'dividend_ratio_detail': () => import('@/views/dividend_ratio_detail')
		// 	},
		// 	meta:{title:'分润比例配置',icon:'document'}
		// },
		{
			path: 'config',
			meta: {title: '后台配置', icon: 'folder'},
			component: RouterView,
			children: [
				{
					path:'star_setting_list',
					name:'star_setting_list',
					component: () => import('@/views/config/star_setting_list'),
					hiddens:{
						'star_setting_detail': () => import('@/views/config/star_setting_detail'),
						'star_setting_unify': () => import('@/views/config/star_setting_unify')
					},
					meta:{title:'星达人配置',icon:'document'}
				},
				// {
				// 	path:'star_app_pic',
				// 	name:'star_app_pic',
				// 	component: () => import('@/views/config/star_app_pic'),
				// 	meta:{title:'星达人APP图片配置',icon:'document'}
				// },
				{
					path:'dividend_ratio_setting',
					name:'dividend_ratio_setting',
					component: () => import('@/views/config/dividend_ratio_setting'),
					meta:{title:'手续费分红比例',icon:'document'}
				},
				{
					path:'limit_login_setting',
					name:'limit_login_setting',
					component: () => import('@/views/config/limit_login_setting'),
					meta:{title:'限制登录时间',icon:'document'}
				},
				{
					path:'DDout_limit_list',
					name:'DDout_limit_list',
					component: () => import('@/views/config/DDout_limit_list'),
					hiddens:{
						'DDout_limit_detail': () => import('@/views/config/DDout_limit_detail'),
						'DDout_switch_setting': () => import('@/views/config/DDout_switch_setting'),
					},
					meta:{title:'DD转出限制',icon:'document'}
				},
				{
					path:'MLDD_ZLDD_setting',
					name:'MLDD_ZLDD_setting',
					component: () => import('@/views/config/MLDD_ZLDD_setting'),
					meta:{title:'MLDD/ZLDD配置',icon:'document'}
				},
				{
					path:'gift_pack_list',
					name:'gift_pack_list',
					component: () => import('@/views/config/gift_pack_list'),
					hiddens:{
						'gift_pack_detail': () => import('@/views/config/gift_pack_detail'),
					},
					meta:{title:'任务礼包配置',icon:'document'}
				},
			]
		},
		{
			path: 'bug',
			meta: {title: '特殊管理', icon: 'folder'},
			component: RouterView,
			children: [
				{
					path:'register_batch',
					name:'register_batch',
					component: () => import('@/views/bug/register_batch'),
					meta:{title:'批量注册',icon:'document'}
				},
				{
					path: 'virtual_task_list',
					name: 'virtual_task_list',
					component: () => import('@/views/bug/virtual_task_list'),
					hiddens:{
						'virtual_task_add': () => import('@/views/bug/virtual_task_add'),
						'virtual_task_progress': () => import('@/views/bug/virtual_task_progress'),
					},
					meta: { title: '虚拟用户任务', icon: 'document'}
				},
				{
					path: 'verify_code_list',
					name: 'verify_code_list',
					component: () => import('@/views/bug/verify_code_list'),
					meta: { title: '短信验证码查询', icon: 'document'}
				},
				{
					path: 'send_reel',
					name: 'send_reel',
					component: () => import('@/views/bug/send_reel'),
					meta: { title: '赠送健康礼包', icon: 'document'}
				},
			]
		},
		{
			path: 'system',
			meta: {title: '系统管理',icon: 'folder'},
			component: RouterView,
			children: [
				// {
				// 	path:'service_list',
				// 	name:'service_list',
				// 	component: () => import('@/views/system/service_list'),
				// 	hiddens:{
				// 		'service_detail': () => import('@/views/system/service_detail')
				// 	},
				// 	meta:{title:'客服管理',icon:'setting'}
				// },
				{
					path:'user_list',
					name:'user_list',
					component: () => import('@/views/system/user_list'),
					hiddens:{
						'user_detail': () => import('@/views/system/user_detail')
					},
					meta:{title:'人员管理',icon:'setting'}
				},
				{
					path: 'menu_list',
					name: 'menu_list',
					component: () => import('@/views/system/menu_list'),
					hiddens: {
						'menu_detail': () => import('@/views/system/menu_detail')
					},
					meta: {title: '菜单管理',icon: 'setting'}
				},
				{
					path: 'role_list',
					name: 'role_list',
					component: () => import('@/views/system/role_list'),
					hiddens: {
						'role_detail': () => import('@/views/system/role_detail'),
						'role_menu_dialog': () => import('@/views/system/role_menu_dialog')
					},
					meta: {title: '角色管理',icon: 'setting'}
				}
			]
		},
	]
}];

export default new Router({
	routes: staticRouters,
	staticRouters: staticRouters,
	dynamicRouters: dynamicRouters
})