<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="创建时间" width="280">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标签名" width="180">
        <template slot-scope="scope">
          <!-- <span style="margin-left: 10px">{{ scope.row.label_name }}</span> -->
          <el-tag size="medium">{{ scope.row.label_name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建者" width="180">
        <template slot-scope="scope">
          <!-- <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.username }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.username }}</el-tag>
            </div>
          </el-popover> -->
          <i class="el-icon-s-custom"></i>
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"  width="180">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getLabel,delLabel } from '../../../axios/api'
import { mapState } from 'vuex'
export default {
  components: {},
  // 定义属性
  data() {
    return {
      tableData: [
      ]
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
     ...mapState(['userInfo'])
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getLabelList() {
      try {
        const res = await getLabel(this.userInfo.user_id)
        if(res.code == 200) {
          this.tableData = res.data
        }
      } catch (error) {
        console.log('error', error)
        this.$message({
          type: 'error',
          message: '获取标签失败'
        })
      }
    },
    async handleDelete(index, row) {
      try {
        const res = await delLabel(row.label_id)
        if(res.code == 200) {
          let newTable = this.tableData.filter(item=> item.label_id !== row.label_id)
          this.tableData = newTable
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }
      } catch (error) {
        console.log('error', error)
        this.$message({
            type: 'error',
            message: '删除失败'
          })
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getLabelList()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
   
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
</style>