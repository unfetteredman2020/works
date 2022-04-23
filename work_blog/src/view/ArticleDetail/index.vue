

<template>
  <div>
    <NavBar />
    <div class="box" v-if="article">
      <h1>{{article.title}}</h1>
      <div>
        <span
          :style="{'margin': '50px 30px', 'fontSize': '14px', 'color': '#000'}"
        >作者：{{article.author}}</span>
        <span :style="{'fontSize': '14px', 'color': '#000'}">创建时间：{{article.createdAt}}</span>
      </div>
      <hr border="1px dashed" align="center" width="100%" color="#eee" size="1" />
      <div id="content"></div>
      <!-- 评论 -->
      <div class="comment">
        <h3>评论：</h3>
        <el-input
          show-word-limit
          maxlength="100"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="comment"
        ></el-input>
        <el-button @click="submit" class="commenBtn" type="primary" size="mini">添加评论</el-button>
      </div>
      <div class="commentList">
        <div class="items" v-for="(item, index) in article.comments" :key="index">
          <span>{{item.username.length > 3 ? item.username.trim().substring(0,3): item.username}}</span>
          <span>{{item.comment}}</span>
        </div>
      </div>
    </div>
    <el-empty v-else description="描述文字"></el-empty>
  </div>
</template>

<script>
import NavBar from "../../components/NavBar/index";
import { getArticle, addCommen } from "../../axios/api";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    NavBar
  },
  data() {
    return {
      comment: "",
      article: {}
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    subName(name) {
      console.log("name", name);
      if (name.trim().length > 4) {
        return name.trim().substring(0, 3);
      } else {
        return name;
      }
    }
  },
  mounted() {
    console.log("this.$route.query", this.$route.query);
    this.getArticle();
  },
  methods: {
    async submit() {
      try {
        if (!this.comment) {
          return this.$message({
            type: "error",
            message: "请填写评论内容"
          });
        }
        let parmas = {
          username: this.userInfo.username,
          comment: this.comment,
          avatar: this.userInfo.avatar,
          user_id: this.userInfo.user_id
        };
        const res = await addCommen({
          article_id: this.$route.query.article_id,
          comments: parmas
        });
        if (res && res.code == 200) {
          this.$message({
            type: "success",
            message: "添加评论成功"
          });
          this.comment = "";
          this.getArticle();
        } else {
          this.$message({
            type: "error",
            message: "添加评论失败"
          });
        }
        console.log("res", res);
      } catch (error) {
        console.log("error", error);
        this.$message({
          type: "error",
          message: "添加评论失败"
        });
      }
    },
    async getArticle() {
      try {
        const res = await getArticle(this.$route.query.article_id);
        console.log("res", res.data[0]);
        if (res && res.code == 200) {
          this.article = res.data[0];
          document.getElementById("content").innerHTML = res.data[0].content;
        } else {
          this.$message({
            type: "error",
            message: "获取文章失败"
          });
        }
      } catch (error) {
        console.log("error", error);
        this.$message({
          type: "error",
          message: "获取文章失败"
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.box {
  // border: 1px dashed;
  // border: 1px solid #987cb9;
  box-shadow: 0 0 12px #eee;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  height: calc(100vh - 70px);
  overflow-x: hidden;
  overflow-y: scroll;
  #content {
    // border: 1px solid blue;
    margin: 10px 0;
    font-size: 14px;
    font-weight: 400;
  }
  .comment {
    border: 1px solid blue;
    width: 100%;
    margin: 20px 0;
    .commenBtn {
      margin: 10px 0;
    }
  }
  .commentList {
    // border: 1px solid red;
    width: 100%;
    .items {
      display: flex;
      align-items: center;
      width: 100%;
      border-bottom: 1px dashed #eee;
      margin: 10px 0;
      span:nth-child(1) {
        display: inline-block;
        height: 50px;
        line-height: 50px;
        width: 50px;
        text-align: center;
        background-color: pink;
        color: #fff;
        border-radius: 50%;
      }
      span:nth-child(2) {
        box-sizing: border-box;
        padding: 10px;
        display: inline-block;
        margin-left: 20px;
        width: 85%;
        border: 1px solid #eee;
        // box-shadow: 0 0 12px #eee;
        font-size: 14px;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
        font-weight: normal;
      }
    }
  }
}
</style>

