<template>
  <div>
    <h4>{{ cookie }}</h4>
    <iframe src="/?temo" frameborder="0" width="100%" height="900px"></iframe>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      res: "",
      cookie: ""
    };
  },
  async mounted() {
    // this.init();
  },
  methods: {
    async onload() {
      alert("加载完毕");
    },
    async init() {
      const { data } = await axios({
        method: "get",
        url: "/login"
      });
      let authenticityToken = JSON.stringify(data).match(
        // eslint-disable-next-line no-useless-escape
        /([0-9a-zA-z\+\=\/]{86})\=\=/g
      )[3];
      this.cookie = document.cookie;
      // const {data} =
      await axios({
        method: "post",
        url: "/session",
        data: {
          commit: "Sign in",
          utf8: "✓",
          authenticity_token: authenticityToken,
          login: this.$config.github.userName,
          password: this.$config.github.passowrd
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
