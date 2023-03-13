<template>
	<el-form :inline="true" class="demo-form-inline" :disabled="disabled11">
		<el-form-item label="一级分类">
			<el-select placeholder="请选择" v-model="category1Id" @change="getCategory1Id">
				<el-option
					v-for="category1 in category1List"
					:label="category1.name"
					:value="category1.id"
					:key="category1.id" />
			</el-select>
		</el-form-item>
		<el-form-item label="二级分类">
			<el-select placeholder="请选择" v-model="category2Id" @change="getCategory2Id">
				<el-option
					v-for="category2 in category2List"
					:label="category2.name"
					:value="category2.id"
					:key="category2.id" />
			</el-select>
		</el-form-item>
		<el-form-item label="三级分类">
			<el-select placeholder="请选择" v-model="category3Id">
				<el-option
					v-for="category3 in category3List"
					:label="category3.name"
					:value="category3.id"
					:key="category3.id" />
			</el-select>
		</el-form-item>
	</el-form>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'CategorySelector',
});
</script>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useCategoryStore } from '@/stores/category';
import { storeToRefs } from 'pinia';

//获取到整个分类store对象
const categoryStore = useCategoryStore();

const abc = defineProps<{ disabled11: boolean }>();

const { category1List, category2List, category3List, category1Id, category2Id, category3Id } =
	storeToRefs(categoryStore);

onMounted(() => {
	categoryStore.getCategory1List();
});

const getCategory1Id = () => {
	categoryStore.getCategory2List();
};
const getCategory2Id = () => {
	categoryStore.getCategory3List();
};
</script>

<style lang="less" scoped></style>
