import request from '@/utils/request';
import type { TrademarkData, TrademarkListData } from './interface/trademark';

export default {
	// 获取trademark列表
	get(page: number, limit: number) {
		return request.get<any, TrademarkListData>(`/admin/product/baseTrademark/${page}/${limit}`);
	},

	//新增和修改trademark
	addOrUpdate(trademark: TrademarkData) {
		if (trademark.id) {
			return request.put<any, null>('/admin/product/baseTrademark/update', trademark);
		} else {
			return request.post<any, null>('/admin/product/baseTrademark/save', trademark);
		}
	},

	//删除trademark
	delete(id: number) {
		return request.delete(`/admin/product/baseTrademark/remove/${id}`);
	},
};
