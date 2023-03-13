import { defineStore } from 'pinia';
import userLoginApi from '@/api/userInfo';

import { staticRoutes } from '@/router/routes';
import type { LoginParamsData, userInfoStoreData } from '@/api/model/userInfo';

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
