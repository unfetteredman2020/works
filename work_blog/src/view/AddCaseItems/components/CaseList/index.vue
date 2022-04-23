<template>
  <div>
    <el-table class="customTable" :data="caseList" border style="width: 100%">
      <el-table-column prop="createdAt" label="日期" width="220"></el-table-column>
      <el-table-column prop="author" label="作者" width="120"></el-table-column>
      <el-table-column prop="compile_text" label="编"></el-table-column>
      <el-table-column prop="branchCompile_text" label="分编"></el-table-column>
      <el-table-column prop="chapter_text" label="章"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      class="customPagenation"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>-->
  </div>
</template>

<script>
import { getCaseList, delCase } from "@/axios/api";
import { mapState } from "vuex";
export default {
  components: {},
  // 定义属性
  data() {
    return {
      
      caseList: [],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    ...mapState(["userInfo"])
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getCaseList() {
      try {
        const res = await getCaseList(this.userInfo.user_id);
        console.log("res", res);
        if (res && res.code == 200) {
          this.caseList = res.data;
        } else {
          this.$message({
            type: "error",
            message: "获取case列表失败"
          });
        }
      } catch (error) {
        console.log("error", error);
        this.$message({
          type: "error",
          message: "获取case列表失败"
        });
      }
    },
    async handleClick(row) {
      console.log(row);
      try {
        const res = await delCase(this.userInfo.user_id, row.case_id)
        if(res && res.code == 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getCaseList()
        }else {
          this.$message({
          type: "error",
          message: "删除失败"
        });
        }
      } catch (error) {
        console.log('error', error)
        this.$message({
          type: "error",
          message: "删除失败"
        });
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getCaseList();
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style scoped>
.customTable {
  /* height: 600px; */
  margin-bottom: 20px;
  max-height: 600px;
  overflow-y: scroll;
}
.customPagenation {
  border: 1px solid red;
  text-align: center;
}
</style>