export interface attrValueList {
	id?: number;
	valueName: string;
	attrId: number | undefined;
	isEdit?: boolean;
}

export type attributeData = {
	id?: number;
	attrName: string;
	categoryId: number | string;
	categoryLevel: number;
	attrValueList: attrValueList[];
};

export type attributesData = attributeData[];
