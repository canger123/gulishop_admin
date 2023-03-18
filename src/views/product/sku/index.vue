<template>
	<div>
		<el-card shadow="always" :body-style="{ padding: '20px' }">
			<el-table :data="skuList" border stripe>
				<el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
				<el-table-column label="名称" prop="skuName"></el-table-column>
				<el-table-column label="描述" prop="skuDesc"></el-table-column>
				<el-table-column label="默认图片">
					<template v-slot="{ row }">
						<img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 80px" />
					</template>
				</el-table-column>
				<el-table-column label="重量(KG)" prop="weight"></el-table-column>
				<el-table-column label="价格(元)" prop="price"></el-table-column>
				<el-table-column label="操作">
					<template v-slot="{ row, $index }">
						<el-button
							title="下架"
							type="success"
							size="small"
							icon="ele-Top"
							v-if="row.isSale"
							@click="changeCancelSale(row)"></el-button>
						<el-button
							title="上架"
							type="info"
							size="small"
							icon="ele-Bottom"
							v-else
							@click="changeOnSale(row)"></el-button>
						<el-button title="编辑" type="primary" size="small" icon="ele-Edit"></el-button>
						<el-button title="详情" type="info" size="small" icon="ele-InfoFilled"></el-button>
						<el-button
							title="删除"
							type="danger"
							size="small"
							icon="ele-Delete"
							@click="delCurrentSku(row)"></el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				v-model:current-page="currentPage"
				v-model:page-size="limit"
				layout="prev, pager, next, jumper"
				:total="total"
				@current-change="getSkuList" />
		</el-card>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus';
export default defineComponent({
	name: 'Sku',
});
</script>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import skuApi from '@/api/sku';
import type { SkuInfoData } from '@/api/model/sku';

const currentPage = ref(1);
const limit = ref(10);
const total = ref(0);
const skuList = ref<SkuInfoData[]>([]);

onMounted(() => {
	getSkuList();
});

const getSkuList = async (num: number = 1) => {
	currentPage.value = num;
	try {
		const res = await skuApi.getPageList(currentPage.value, limit.value);
		skuList.value = res.records;
		total.value = res.total;
		// ElMessage.success('获取Sku列表成功');
	} catch (error) {
		ElMessage.error('获取Sku列表失败');
	}
};

const changeCancelSale = async (row: SkuInfoData) => {
	try {
		await skuApi.cancelSale(row.id);
		ElMessage.success('下线成功');
		getSkuList();
	} catch (error) {
		ElMessage.error('下线失败');
	}
};

const changeOnSale = async (row: SkuInfoData) => {
	try {
		await skuApi.onSale(row.id);
		ElMessage.success('上架成功');
		getSkuList();
	} catch (error) {
		ElMessage.error('上架失败');
	}
};
const delCurrentSku = async (row: SkuInfoData) => {
	try {
		await skuApi.deleteSku(row.id);
		ElMessage.success('删除成功');
		getSkuList();
	} catch (error) {
		ElMessage.error('删除失败');
	}
};
</script>

<style lang="less" scoped></style>
