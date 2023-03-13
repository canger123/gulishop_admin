// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
import request from '@/utils/request';
import type { attributeData, attributesData } from './model/attribute';

export default {
	//获取属性值列表
	attrInfoList(category1Id: number, category2Id: number, category3Id: number) {
		return request.get<any, attributesData>(`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`);
	},
	delete(attrId: number) {
		return request.delete(`/admin/product/deleteAttr/${attrId}`);
	},

	// POST /admin/product/saveAttrInfo
	addOrUpdate(attr: attributeData) {
		return request.post('/admin/product/saveAttrInfo', attr);
	},
};
