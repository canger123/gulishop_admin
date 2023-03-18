export type SkuListData = {
	records: SkuInfoData[];
	total: number;
	size: number;
	current: number;
	searchCount: boolean;
	pages: number;
};

export interface SkuInfoData {
	id: number;
	spuId: number;
	price: number;
	skuName: string;
	skuDesc: string;
	weight: string;
	tmId: number;
	category3Id: number;
	skuDefaultImg: string;
	isSale: number;
	createTime: string;
	skuImageList: null;
	skuAttrValueList: null;
	skuSaleAttrValueList: null;
}
