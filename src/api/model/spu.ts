// GET /admin/product/baseSaleAttrList
// getBaseSaleAttrList

// DELETE /admin/product/deleteSpu/{spuId}
// deleteSpu

// GET /admin/product/findSpuInfoByKeyword/{keyword}
// findSpuInfoByKeyword

// GET /admin/product/getSpuById/{spuId}
// 获取spu基本信息

// POST /admin/product/inner/findSpuInfoBySpuIdList
// findSpuInfoBySpuIdList

// POST /admin/product/saveSpuInfo
// saveSpuInfo

// POST /admin/product/updateSpuInfo
// 更改spu信息

// GET /admin/product/{page}/{limit}
// index
export interface baseSaleAttrData {
	id: number;
	name: string;
}
type baseSaleAttrListData = baseSaleAttrData[];

interface spuSaleAttrValueListData {
	id: number;
	spuId: number;
	baseSaleAttrId: number;
	saleAttrValueName: string;
	saleAttrName: string;
	isChecked: null;
}
type spuSaleAttrListData = {
	id: number;
	spuId: number;
	baseSaleAttrId: number;
	saleAttrName: string;
	spuSaleAttrValueList: spuSaleAttrValueListData[];
};
type spuAttrData = {
	id: number;
	spuName: string;
	description: string;
	category3Id: number;
	tmId: number;
	spuSaleAttrList: spuSaleAttrListData[];
	spuImageList: null;
};
