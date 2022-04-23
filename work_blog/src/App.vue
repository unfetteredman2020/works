
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  // components: {}
  created() {
    //在页面加载时读取localStorage里的状态信息
    localStorage.getItem("userInfo") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("userInfo"))));

    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload",()=>{
        localStorage.setItem("userInfo",JSON.stringify(this.$store.state))
    })
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  /* background-color: #f2f3f4; */
  /* overflow: hidden; */
}
</style>
