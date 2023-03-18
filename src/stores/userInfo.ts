import { defineStore } from 'pinia';
import userLoginApi from '@/api/userInfo';

import { staticRoutes, allAsyncRoutes, anyRoute } from '@/router/routes';
import type { LoginParamsData, userInfoStoreData } from '@/api/model/userInfo';
import type { RouteRecordRaw } from 'vue-router';
import router from '@/router';

function filterAsyncRoutes(allAsyncRoutes: RouteRecordRaw[], routeNames: string[]) {
	let res = allAsyncRoutes.filter((item) => {
		if (routeNames.indexOf(item.name as string)) {
			if (item.children && item.children.length) {
				filterAsyncRoutes(item.children, routeNames);
			}
			return true;
		}
	});
	return res;
}

function addRoutes(routes: RouteRecordRaw[]) {
	routes.forEach((item) => {
		router.addRoute(item);
	});
}

function resetRouter() {
	let routes = router.getRoutes();
	routes.forEach((item) => {
		router.removeRoute(item.name as string);
	});
	addRoutes(staticRoutes);
}

export const useUserInfoStore = defineStore('useInfo', {
	state(): userInfoStoreData {
		return {
			token: localStorage.getItem('token_key') || '',
			userInfo: {
				routes: [],
				buttons: [],
				roles: [],
				name: '',
				avatar: '',
			},
			menuRoutes: staticRoutes,
		};
	},
	actions: {
		// 登录
		async login(loginParams: LoginParamsData) {
			try {
				const res = await userLoginApi.reqUserLogin(loginParams);
				this.token = res.token;
				localStorage.setItem('token_key', res.token);
				return 'ok';
			} catch (error) {
				return Promise.reject(error);
			}
		},

		// 获取用户信息
		async getUserInfo() {
			try {
				const res = await userLoginApi.reqUserInfo();
				this.userInfo = res;
				let userAsyncRoutes = filterAsyncRoutes(allAsyncRoutes, res.routes);
				addRoutes(userAsyncRoutes.concat(anyRoute));
				this.menuRoutes = staticRoutes.concat(userAsyncRoutes, anyRoute);
				return 'ok';
			} catch (error) {
				return Promise.reject(error);
			}
		},

		// 退出登录
		async logout() {
			try {
				await userLoginApi.reqLogout();
				this.reset();
				resetRouter();
				return 'ok';
			} catch (error) {
				return Promise.reject(error);
			}
		},

		//清空用户信息等数据
		reset() {
			this.token = '';

			// 使用Object.assign合并对象
			Object.assign(this.userInfo, {
				routes: [],
				buttons: [],
				roles: [],
				name: '',
				avatar: '',
			});
			localStorage.removeItem('token_key');
		},
	},
	getters: {},
});
