import { defineStore } from 'pinia';
import categoryApi from '@/api/category';
import type { categorysData } from '@/api/model/category';

interface categoryListData {
	category1List: categorysData;
	category1Id: number | string;
	category2List: categorysData;
	category2Id: number | string;
	category3List: categorysData;
	category3Id: number | string;
}

export const useCategoryStore = defineStore('category', {
	state(): categoryListData {
		return {
			category1List: [],
			category1Id: '',
			category2List: [],
			category2Id: '',
			category3List: [],
			category3Id: '',
		};
	},
	actions: {
		//获取一级分类列表
		async getCategory1List() {
			try {
				const res = await categoryApi.getCategory1();
				this.category1List = res;
			} catch (error) {
				return Promise.reject('获取一级分类列表失败');
			}
		},

		//获取二级分类列表
		async getCategory2List() {
			this.category2List = [];
			this.category2Id = '';
			this.category3List = [];
			this.category3Id = '';
			try {
				const res = await categoryApi.getCategory2(this.category1Id as number);
				this.category2List = res;
			} catch (error) {
				return Promise.reject('获取二级分类列表失败');
			}
		},

		//获取三级分类列表
		async getCategory3List() {
			this.category3List = [];
			this.category3Id = '';
			try {
				const res = await categoryApi.getCategory3(this.category2Id as number);
				this.category3List = res;
			} catch (error) {
				return Promise.reject('获取三级分类列表失败');
			}
		},
	},
	getters: {},
});
