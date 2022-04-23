

<template>
  <div id="works">
    <NavBar />
    <div class="collection">
      <VirtualCollection
        :cellSizeAndPositionGetter="cellSizeAndPositionGetter"
        :collection="list"
        :height="800"
        :width="width"
        class="customVirtual"
      >
        <!-- <div
          slot="cell"
          slot-scope="props"
          class="card"
          :class="props.data.color"
        >{{props.data.text}}</div>-->
        <div slot="cell" class="card" slot-scope="props" @click="goArticleDetail(props.data)">
          <!-- <div>{{props.data.title}}</div> -->
          <img class="itemImg" :src="props.data.link" />
          <div><span>文章标题: </span><span>{{props.data.title}}</span></div>
          <div><span>作者: </span><span>{{props.data.author}}</span></div>
        </div>
      </VirtualCollection>
    </div>
  </div>
</template>

<script>
import { getArticleList } from "../../axios/api";
import { mapState } from "vuex";
import NavBar from "../../components/NavBar/index";
export default {
  name: "App",
  components: {
    NavBar
  },
  data() {
    return {
      line: "8",
      // width: (document.body.clientWidth || document.documentElement.clientWidth) - 20
      width: 1200,
      list: []
    };
  },
  computed: {
    ...mapState(["userInfo"]),

    items() {
      const amount = +this.amount;
      const line = +this.line;
      const columnHeight = new Array(line).fill(0);
      let item = new Array(amount).fill(1).map((_, index) => {
        const column = index % line;
        // const height = 50 + 100 * Math.random();
        const height = 200;
        const result = {
          data: {
            text: `#${index}`,
            color: this.randomColor()
          },
          height,
          width: 145,
          x: column * 165,
          y: columnHeight[column]
        };
        columnHeight[column] += height + 10;
        return result;
      });
      console.log("item1", item);
      return item;
    }
  },
  methods: {
    goArticleDetail(props) {
      console.log('path', props)
      this.$router.push({
        path: '/articleDetail',
        query: {
          article_id: props.article_id
        }
      })
    },
    format(list) {
      const line = +this.line;
      let arr = list;
      let newArr = [];
      let columnHeight = new Array(line).fill(0);
      arr.forEach((i, index) => {
        
        const column = index % line;
        const height = 200;
        let item = {};
        item.data = i;
        item.height = height;
        (item.width = 145), (item.x = column * 165);
        item.y = columnHeight[column];
        newArr.push(item);
        columnHeight[column] += height + 20;
      });
      console.log("item2", arr);
      this.list = newArr;
    },
    cellSizeAndPositionGetter(item) {
      const { data, ...sizeAndPosition } = item;
      // console.log("data", data);
      this.testData = data;
      return sizeAndPosition;
    },
    randomColor() {
      return "color" + parseInt(Math.random() * 8);
    },
    async getAllArticle() {
      try {
        const res = await getArticleList(this.userInfo.user_id);
        console.log("res", res);

        if (res && res.code == 200) {
          console.log("this.list", this.list);
          // this.list = res.data;
          this.format(res.data);
        } else {
          this.$message({
            type: "error",
            message: "获取文章列表失败"
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  },
  mounted() {
    this.getAllArticle();
  }
};
</script>
<style lang="less" scoped>
#works {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .collection {
    // border: 1px solid red;
    margin-top: 40px;
    padding-bottom: 50px;
    .vue-virtual-collection {
      margin: 0 auto;
    }
    .customVirtual {
      // border: 1px solid blue;
      width: 91vw !important;
    }
  }
}
.card {
  border: 1px solid rgb(233, 227, 227);
  // background: #aaa;
  width: 100%;
  height: 100%;
  color: red;
  line-height: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  // justify-content: center;
  // align-items: center;
  border-radius: 5px;
  .itemImg {
    width: 145px;
    // max-height: 158px;
    height: 164px;
  }
  &.color0 {
    background: rgb(244, 67, 54);
  }
  &.color1 {
    background: rgb(255, 235, 59);
  }
  &.color2 {
    background: rgb(255, 152, 0);
  }
  &.color3 {
    background: rgb(33, 150, 243);
  }
  &.color4 {
    background: rgb(55, 64, 70);
  }
  &.color5 {
    background: rgb(103, 58, 183);
  }
  &.color6 {
    background: rgb(63, 81, 181);
  }
  &.color7 {
    background: rgb(76, 175, 80);
  }
}
.card:hover {
  cursor: pointer;

}
.card>div {
  // margin-bottom: 10px;
  margin-top: 5px;
  font-size: 14px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-weight: 400;
  display: flex;
  align-items: center;
  color: #e5e6e7;
}
.card>div>span:nth-child(1) {
  color: #2c3e50;
  white-space: nowrap;
}
.card>div>span:nth-child(2) {
  color: #2c3e50;
  display: inline-block;
  max-width: 73px;
  // border: 1px solid blue;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

