// 登录所需数据接口
export interface LoginParamsData {
	username: string;
	password: string;
}

// 登录返回数据接口
export interface TokenData {
	token: string;
}

// 登录返回用户信息接口
export interface UserInfoData {
	routes: string[];
	buttons: string[];
	roles: string[];
	name: string;
	avatar: string;
}

// 设置 userInfo 中 state 数据类型
export interface userInfoStoreData {
	token: string | null;
	userInfo: UserInfoData;
}
