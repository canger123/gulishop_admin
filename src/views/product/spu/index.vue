<template>
	<div>
		<el-card shadow="always" :body-style="{ padding: '20px' }">
			<CategorySelector :disabled="false"></CategorySelector>
		</el-card>
		<el-card shadow="always" :body-style="{ padding: '20px' }" style="margin-top: 20px">
			<SpuList v-if="showState === 1"></SpuList>
			<SpuForm v-else-if="showState === 2"></SpuForm>
			<SkuForm v-else></SkuForm>
		</el-card>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'Spu',
});
</script>
<script lang="ts" setup>
import SpuList from './components/SpuList/index.vue';
import SpuForm from './components/SpuForm/index.vue';
import SkuForm from './components/SkuForm/index.vue';
import { ref } from 'vue';
const showState = ref(1);
</script>

<style lang="less" scoped></style>
