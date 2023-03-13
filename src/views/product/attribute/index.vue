<template>
	<div>
		<el-card shadow="always" :body-style="{ padding: '20px' }">
			<CategorySelector :disabled11="!isShowAddAttr"></CategorySelector>
		</el-card>
		<el-card shadow="always" :body-style="{ padding: '20px' }" style="margin-top: 20px" v-show="isShowAddAttr">
			<el-button type="primary" :disabled="isShowAddAttrButton" icon="ele-Plus" @click="addAttr">添加属性</el-button>
			<el-table :data="attrList" style="width: 100%" border>
				<el-table-column type="index" label="序号" width="80"></el-table-column>
				<el-table-column prop="attrName" label="属性名" width="150"></el-table-column>
				<el-table-column label="属性值名称列表">
					<template v-slot="{ row }">
						<el-tag
							type="danger"
							style="margin-right: 5px"
							size="default"
							v-for="attrValue in row.attrValueList"
							:key="attrValue.id">
							{{ attrValue.valueName }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template v-slot="{ row }">
						<el-button type="warning" icon="ele-Edit" size="small" title="修改" @click="updataAttr(row)"></el-button>
						<el-popconfirm :title="`你确定删除${row.attrName}吗？`" @confirm="deleteAttr(row)">
							<template #reference>
								<el-button type="danger" size="small" icon="ele-Delete" title="删除"></el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
		</el-card>

		<el-card class="box-card" v-show="!isShowAddAttr" style="margin-top: 20px">
			<el-form :inline="true">
				<el-form-item label="属性名">
					<el-input placeholder="输入属性名" v-model="attrForm.attrName"></el-input>
				</el-form-item>
			</el-form>
			<el-button type="primary" size="default" @click="addAttrValue" :disabled="!attrForm.attrName"
				>添加属性值</el-button
			>
			<el-button @click="isShowAddAttr = true">取消</el-button>
			<el-table :data="attrForm.attrValueList" border stripe style="margin-top: 20px">
				<el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
				<el-table-column label="属性值名称">
					<!-- @keyup.enter="toLook(row, $index)" -->
					<template v-slot="{ row, $index }">
						<el-input
							v-if="row.isEdit"
							@blur="toLook(row, $index)"
							@keyup.enter="$event.target.blur()"
							v-model="row.valueName"
							placeholder="输入属性值名称"
							size="small"
							autofocus
							ref="inputRef">
						</el-input>
						<span v-else @click="toEdit(row)" style="display: inline-block; width: 100%">{{ row.valueName }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template v-slot="{ row, $index }">
						<el-popconfirm
							:title="`你确定要删除${row.valueName}吗？`"
							@confirm="attrForm.attrValueList.splice($index, 1)">
							<template #reference>
								<el-button type="danger" size="small" title="删除属性值" icon="ele-Delete"></el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
			<el-button type="primary" size="default" :disabled="!attrForm.attrValueList.length" @click="saveAttrValueList"
				>保存</el-button
			>
			<el-button @click="isShowAddAttr = true">取消</el-button>
		</el-card>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'Attribute',
});
</script>
<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue';
import type { attributeData, attributesData, attrValueList } from '@/api/model/attribute';
import { useCategoryStore } from '@/stores/category';
import attributeAPI from '@/api/attribute';
import cloneDeep from 'lodash/cloneDeep';
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';

const attrList = ref<attributesData>([]);
const categoryStore = useCategoryStore();

const isShowAddAttr = ref(true);
let isShowAddAttrButton = ref(true);

const { category1Id, category2Id, category3Id } = storeToRefs(categoryStore);

// 定义收集数据
const attrForm = ref<attributeData>({
	attrName: '',
	attrValueList: [
		// {
		// 	attrId: 71,
		// 	id: 96,
		// 	valueName: '',
		// },
	],
	categoryId: '',
	categoryLevel: 3,
});

//修改属性和属性值
// 编辑的属性值input框全部改为span标签，即把isEdit的值改为false
const updataAttr = (row: attributeData) => {
	isShowAddAttr.value = false;
	attrForm.value = cloneDeep(row);

	attrForm.value.attrValueList.forEach((item) => (item.isEdit = false));
};

//添加属性值
const addAttrValue = () => {
	attrForm.value.attrValueList.push({
		attrId: attrForm.value.id,
		valueName: '',
		isEdit: true, //用于条件渲染，是否展示input框，新添加的属性默认添加
	});

	//input自动获取焦点
	nextTick(() => {
		inputRef.value.focus();
	});
};

//添加属性
const addAttr = () => {
	isShowAddAttr.value = false;
	attrForm.value = {
		attrName: '',
		attrValueList: [],
		categoryId: category3Id.value,
		categoryLevel: 3,
	};
};

const inputRef = ref();

// 点击属性值切换为input框
const toEdit = (row: attrValueList) => {
	row.isEdit = true;

	//input自动获取焦点
	nextTick(() => {
		inputRef.value.focus();
	});
};

// 属性值失去焦点和按下enter，切换为span
const toLook = (row: attrValueList, index: number) => {
	if (!row.valueName || !row.valueName.trim()) {
		ElMessage.error('输入的数据不能为空');
		attrForm.value.attrValueList.splice(index, 1);
		return;
	}

	//判断输入的数据是不是和除自身以为的属性值重复
	let isRepeat = attrForm.value.attrValueList.some((item) => {
		//判断当前项是否为自身
		if (item !== row) {
			return item.valueName === row.valueName;
		}
	});
	if (isRepeat) {
		ElMessage.error('输入的数据已存在');
		row.valueName = '';
		return;
	}

	row.isEdit = false;
};

// 保存属性值
const saveAttrValueList = async () => {
	let attr = attrForm.value;

	attr.attrValueList = attr.attrValueList.filter((item) => {
		if (item.valueName !== '') {
			delete item.isEdit;
			return true;
		}
	});

	if (attr.attrValueList.length !== 0) {
		try {
			// 4、成功
			await attributeAPI.addOrUpdate(attr);
			ElMessage.success('保存平台属性成功');
			isShowAddAttr.value = true;
			getAttrList();
		} catch (error) {
			// 5、失败
			ElMessage.error('保存平台属性失败');
			isShowAddAttr.value = true;
		}
	}
};

//删除属性
const deleteAttr = async (row: attributeData) => {
	try {
		await attributeAPI.delete(row.id as number);
		ElMessage.success('删除平台属性成功');
		getAttrList();
	} catch (error) {
		ElMessage.error('删除平台属性失败');
	}
};

//这个函数专门用来发请求获取属性列表
const getAttrList = async () => {
	try {
		const res = await attributeAPI.attrInfoList(
			category1Id.value as number,
			category2Id.value as number,
			category3Id.value as number
		);
		attrList.value = res;
	} catch (error) {
		ElMessage.error('获取平台属性列表失败');
	}
};

watch(
	category3Id,
	async (newVal) => {
		if (newVal !== '') {
			getAttrList();

			isShowAddAttrButton.value = false;
		} else {
			attrList.value = [];
			isShowAddAttrButton.value = true;
		}
	},
	{
		immediate: true,
	}
);
</script>

<style lang="less" scoped></style>
