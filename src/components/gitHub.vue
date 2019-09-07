<template>
  <div>
    <el-upload
      v-show="isFile"
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :before-upload="uploadFile"
      multiple
      :limit="3"
      :file-list="fileList"
      list-type="picture"
    >
      <el-button size="small" style="width: 100%;" type="primary"
        >点击上传</el-button
      >
      <div slot="tip" class="el-upload__tip">
        {{ tip }}
      </div>
    </el-upload>
    <div>
      <img :src="base64" alt="" width="100%" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      res: "",
      cookie: "",
      fileList: [],
      base64: "",
      tip: "只能上传jpg/png文件，且不超过500kb",
      isFile: true
    };
  },
  async mounted() {
    // this.init();
  },
  methods: {
    uploadFile(file) {
      let reg = /(jpg|png|jpeg|webpp|img)/g;
      if (file.size / 1024 < 4108 && file.type.match(reg).length > 0) {
        this.isFile = false;
        let rander = new FileReader();
        rander.readAsDataURL(file);
        rander.onload = e => {
          this.base64 = e.target.result;
          axios({
            method: "POST",
            url: "/ocrservice/advanced",
            headers: {
              // eslint-disable-next-line prettier/prettier
              "Authorization": "APPCODE 524f3f0599594374aff993667b0ea387",
              "Content-Type": "application/json; charset=UTF-8"
            },
            data: {
              img: this.base64,
              //是否需要识别结果中每一行的置信度，默认不需要。 true：需要 false：不需要
              prob: true,
              //是否需要单字识别功能，默认不需要。 true：需要 false：不需要
              charInfo: true,
              //是否需要自动旋转功能，默认不需要。 true：需要 false：不需要
              rotate: true,
              //是否需要表格识别功能，默认不需要。 true：需要 false：不需要
              table: true,
              //字块返回顺序，false表示从左往右，从上到下的顺序，true表示从上到下，从左往右的顺序，默认false
              sortPage: true
            }
          });
          // .then(res => {
          //   // console.log(res.data);
          // });
        };
      } else {
        if (file.size / 1024 > 4108) {
          this.tip = "文件过大,选择4m一下的图片试试吧";
        }
        if (file.type.match(reg).length > 0) {
          this.tip = "文件类型不受支持哦,这里只可以上传图片";
        }
      }
      return false;
    },
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
