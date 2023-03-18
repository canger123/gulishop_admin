<template>
	<div>
		<el-button type="primary" size="default" icon="ele-Plus" style="margin: 20px 0">添加SPU</el-button>
		<el-table border stripe>
			<el-table-column type="index" label="序号" width="150"> </el-table-column>
			<el-table-column label="SPU名称"> </el-table-column>
			<el-table-column label="SPU描述"> </el-table-column>
			<el-table-column label="操作"> </el-table-column>
		</el-table>
		<el-pagination
			v-model:current-page="page"
			v-model:page-size="limit"
			:page-sizes="[3, 5, 7, 10]"
			layout=" prev, pager, next, jumper, -> , sizes , total ,"
			:total="total"
			:pager-count="9"
			@size-change="handleSizeChange"
			@current-change="getTrademarkList" />
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'SpuList',
});
</script>
<script lang="ts" setup>
import { ref } from 'vue';
const page = ref(1);
const limit = ref(3);
const total = ref(10);

const handleSizeChange = async (val: number) => {
	limit.value = val;
	getTrademarkList();
};

const getTrademarkList = () => {};
</script>

<style lang="less" scoped></style>
