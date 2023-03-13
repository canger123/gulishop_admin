import request from '@/utils/request';
import type { categorysData } from '@/api/model/category';
export default {
	//获取一级分类
	getCategory1() {
		return request.get<any, categorysData>('/admin/product/getCategory1');
	},
	//获取二级分类
	getCategory2(category1Id: number) {
		return request.get<any, categorysData>(`/admin/product/getCategory2/${category1Id}`);
	},
	//获取三级分类
	getCategory3(category2Id: number) {
		return request.get<any, categorysData>(`/admin/product/getCategory3/${category2Id}`);
	},
};
