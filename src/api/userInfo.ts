import request from '@/utils/request';
import type { LoginParamsData, TokenData, UserInfoData } from '@/api/interface/userInfo';

export default {
	/**
	 * @description 登录
	 * @param loginParams
	 * @returns Promise
	 */
	reqUserLogin(loginParams: LoginParamsData) {
		return request.post<any, TokenData>('/admin/acl/index/login', loginParams);
	},

	/**
	 * @description 获取用户数据
	 * @returns Promise
	 */
	reqUserInfo() {
		return request.get<any, UserInfoData>('/admin/acl/index/info');
	},

	/**
	 * @description 退出登录
	 * @returns Promise
	 */
	reqLogout() {
		return request.post<any, null>('/admin/acl/index/logout');
	},
};
