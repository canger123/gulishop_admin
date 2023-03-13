<template>
	<div>
		<el-card class="box-card" :body-style="{ padding: '20px' }" shadow="always">
			<template #header>
				<div class="card-header">
					<el-button type="primary" icon="ele-Plus" @click="showAddDiglog">添加</el-button>
				</div>
			</template>

			<el-table :data="trademarkList" border stripe>
				<el-table-column label="序号" width="80" align="center" type="index"></el-table-column>
				<el-table-column label="品牌名称" prop="tmName"></el-table-column>
				<el-table-column label="品牌LOGO">
					<template v-slot="{ row, $index }">
						<img :src="row.logoUrl" alt="" style="width: 100px; height: 60px" />
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template v-slot="{ row, $index }">
						<el-button type="warning" icon="ele-Edit" size="small" @click="showUpdateDialog(row)">修改</el-button>
						<el-button type="danger" icon="ele-Delete" size="small" @click="delTrademark(row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

			<el-dialog v-model="dialogFormVisible" :title="`${tmForm.id ? '修改品牌' : '添加品牌'}`">
				<el-form :rules="rules" :model="tmForm" ref="tmFormRef">
					<el-form-item label="品牌名字" prop="tmName">
						<el-input autocomplete="off" v-model="tmForm.tmName" />
					</el-form-item>
					<el-form-item label="上传图片" prop="logoUrl">
						<el-upload
							class="avatar-uploader"
							action="/app-dev/admin/product/fileUpload"
							:show-file-list="false"
							:on-success="handleAvatarSuccess"
							:before-upload="beforeAvatarUpload">
							<img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
							<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>

							<template #tip>
								<div class="el-upload__tip">请上传jpg格式的图片且大小不超过2MB</div>
							</template>
						</el-upload>
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="dialogFormVisible = false">取消</el-button>
						<el-button type="primary" @click="addOrUpdateTrademark"> 确认 </el-button>
					</span>
				</template>
			</el-dialog>

			<el-pagination
				v-model:current-page="page"
				v-model:page-size="limit"
				:page-sizes="[3, 5, 7, 10]"
				layout=" prev, pager, next, jumper, -> , sizes , total ,"
				:total="total"
				:pager-count="9"
				@size-change="handleSizeChange"
				@current-change="getTrademarkList" />
		</el-card>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
	name: 'Trademark',
});
</script>
<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import TrademarkApi from '@/api/trademark';
import type { TrademarkData } from '@/api/model/trademark';
import { Plus } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox, type FormRules, type UploadProps } from 'element-plus';

const trademarkList = ref<TrademarkData[]>([]);
const page = ref(1);
const limit = ref(3);
const total = ref(0);
const dialogFormVisible = ref(false);
const tmForm = ref<TrademarkData>({
	tmName: '',
	logoUrl: '',
});

onMounted(() => {
	getTrademarkList();
});

//获取列表
const getTrademarkList = async (num: number = 1) => {
	page.value = num;
	try {
		const res = await TrademarkApi.get(page.value, limit.value);
		trademarkList.value = res.records;
		total.value = res.total;
	} catch (error) {
		return Promise.reject(error);
	}
};

//显示添加对话框
const showAddDiglog = () => {
	tmForm.value = {
		tmName: '',
		logoUrl: '',
	};

	dialogFormVisible.value = true;

	nextTick(() => {
		tmFormRef.value.resetFields();
	});
};

//点击修改显示对话框
const showUpdateDialog = (row: TrademarkData) => {
	dialogFormVisible.value = true;
	tmForm.value = { ...row };
};

// 分页器获取每页显示条数
const handleSizeChange = async (val: number) => {
	limit.value = val;
	getTrademarkList();
};

// 添加品牌
const addOrUpdateTrademark = () => {
	tmFormRef.value.validate(async (isValid: boolean) => {
		if (isValid) {
			let trademark = tmForm.value;
			try {
				await TrademarkApi.addOrUpdate(trademark);
				//添加成功之后弹出提示
				ElMessage.success(trademark.id ? '修改品牌成功' : '添加品牌成功');
				dialogFormVisible.value = false;
				getTrademarkList(trademark.id ? page.value : 1);
			} catch (error) {
				ElMessage.error(trademark.id ? '修改品牌失败' : '添加品牌失败');
			}
		}
	});
};

//删除品牌
const delTrademark = (row: TrademarkData) => {
	ElMessageBox.confirm(`你确定删除${row.tmName}吗？`, 'Warning', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			try {
				await TrademarkApi.delete(row.id as number);
				ElMessage({
					type: 'success',
					message: '删除品牌成功',
				});
				// 如果删除的当前页数量是大于1，那么删除后还是停留在当前页
				// 如果当前页数量不大于1就是1，那么删除后是要停留在上一页
				getTrademarkList(trademarkList.value.length > 1 ? page.value : page.value - 1);
			} catch (error) {
				ElMessage({
					type: 'error',
					message: '删除品牌失败',
					duration: 5000,
				});
			}
		})
		.catch(() => {
			ElMessage({
				type: 'info',
				message: '取消删除成功',
			});
		});
};

// 分页器获取当前页码
// const handleCurrentChange = (val: number) => {
// 	console.log(`current page: ${val}`);
// };

// 上传图片相关
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
	tmForm.value.logoUrl = response.data;
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
	if (rawFile.type !== 'image/jpeg') {
		ElMessage.error('请上传jpg格式的图片!');
		return false;
	} else if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error('图片大小不能超过2MB!');
		return false;
	}
	return true;
};

const validateTmName = (rule: any, value: any, callback: any) => {
	if (value.length < 2 || value.length > 10) {
		callback(new Error('品牌名称必须2-10')); //callback在调用的时候传递错误信息 代表验证不通过
	} else {
		callback(); //验证用过
	}
};

// 表单验证规则
// tmFormRef拿到表单的组件对象
const tmFormRef = ref();

const rules = ref<FormRules>({
	tmName: [
		{ required: true, message: '品牌名称必须填写', trigger: 'blur' },
		// { min: 3, max: 5, message: '品牌名称长度应为2-10', trigger: 'change' },
		{ validator: validateTmName, trigger: 'change' },
	],
	logoUrl: [
		{
			required: true,
			message: '品牌图片必须上传',
			trigger: 'change',
		},
	],
});
</script>

<style scoped>
.avatar-uploader .avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	text-align: center;
}
</style>
