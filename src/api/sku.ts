import request from '@/utils/request';
import type { SkuListData } from './model/sku';
export default {
	getPageList(page: number, limit: number) {
		return request.get<any, SkuListData>(`/admin/product/list/${page}/${limit}`);
	},
	onSale(skuId: number) {
		return request.get<any, any>(`/admin/product/onSale/${skuId}`);
	},
	cancelSale(skuId: number) {
		return request.get<any, any>(`/admin/product/cancelSale/${skuId}`);
	},
	deleteSku(skuId: number) {
		return request.delete(`/admin/product/deleteSku/${skuId}`);
	},
};
