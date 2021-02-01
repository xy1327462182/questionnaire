<template>
  <div class="detail" >
    <div v-if="!empty">
      <div class="title">{{ docs.title }}</div>
      <div class="info_wrap">
        <div class="info_text">{{ docs.info || "暂无简介说明" }}</div>
      </div>
      <div class="list">
        <div
          class="ques_item"
          v-for="(item, index) in docs.questionList"
          :key="index"
        >
          <div class="ques_item_title">
            <span class="ques_item_required_icon" v-if="item.must">*</span>
            <span class="ques_item_index">{{ index + 1 }}.</span>
            <span class="ques_item_title_txt">{{ item.title }}</span>
            <span class="ques_item_type" v-if="item.type == 0">[单选题]</span>
            <span class="ques_item_type" v-if="item.type == 1">[多选题]</span>
            <span class="ques_item_type" v-if="item.type == 2">[打分题]</span>
            <span class="ques_item_type" v-if="item.type == 3">[填空题]</span>
          </div>
          <div class="ques_item_content_wrap">
            <van-radio-group
              v-if="item.type == 0"
              class="ques_item_option_wrap"
              v-model="resultList[index].optionResult"
            >
              <van-radio
                v-for="radio in item.options"
                :key="radio.name"
                :name="radio.name"
                icon-size="16px"
                class="ques_item_option_item"
                >{{ radio.name }}</van-radio
              >
            </van-radio-group>

            <van-checkbox-group
              v-if="item.type == 1"
              class="ques_item_option_wrap"
              v-model="resultList[index].optionResultList"
            >
              <van-checkbox
                v-for="check in item.options"
                :key="check.name"
                :name="check.name"
                icon-size="16px"
                shape="square"
                class="ques_item_option_item"
                >{{ check.name }}</van-checkbox
              >
            </van-checkbox-group>

            <van-rate
              v-model="resultList[index].optionResult"
              :count="10"
              gutter="10px"
              v-if="item.type == 2"
            />

            <input
              type="text"
              class="ques_item_fill_ipt"
              v-model="resultList[index].optionResult"
              v-if="item.type == 3"
            />
          </div>
        </div>
      </div>
      <div class="save_btn_wrap">
        <van-button type="primary" block round @click="saveDocs"
          >提交问卷</van-button
        >
      </div>
    </div>
    <div v-if="empty">
      <van-empty description="问卷不存在或已下架" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import util from "../util/index";

export default {
  data() {
    return {
      id: "", //问卷id
      docs: {}, //问卷数据
      resultList: [], //问卷结果数组
      empty: false,
    };
  },
  methods: {
    //获取问卷
    async getDocs() {
      this.$toast.loading("加载中");
      const result = await axios({
        url: "/api/docs/doc",
        method: "get",
        params: {
          id: this.id,
        },
      });
      if (result.data.code == 0) {
        this.$toast.clear();
        this.docs = result.data.data;
        // console.log(this.docs);
        if (this.docs.status == 1) {
          //下架
          this.empty = true
          return
        } else {
          //生成问卷答案对象
          this.handleResultObj();
          // console.log(this.docs);
        }
      } else {
        this.$toast.fail(result.data.message);
      }
    },
    //生成问卷答案列表
    handleResultObj() {
      //获取问题列表
      let qsList = this.docs.questionList;
      //生成结果列表
      let resultList = [];
      qsList.forEach((item, index) => {
        if (item.type == 1) {
          //多选处理 多选有多个结果， 其他都是一个结果
          resultList.push({
            index: index, //问题索引
            type: item.type, //问题类型
            title: item.title, //问题标题
            must: item.must, //问题是否必选
            optionResultList: [], //问题选项结果数组
          });
        } else {
          resultList.push({
            index: index, //问题索引
            type: item.type, //问题类型
            title: item.title, //问题标题
            must: item.must, //问题是否必选
            optionResult: "", //问题选项结果
          });
        }
      });
      this.resultList = resultList;
    },
    //提交问卷
    saveDocs() {
      console.log(this.resultList);
      //验证数据
      this.validate();
    },
    //验证数据
    validate() {
      let res = true;
      this.resultList.forEach((item, index) => {
        if (item.must && item.type == 1) {
          //如果多选
          if (item.optionResultList.length <= 0) {
            res = false;
          }
        } else if (item.must) {
          //另外三个
          if (!item.optionResult) {
            res = false;
          }
        }
      });
      if (!res) {
        //有题没填
        this.$toast.fail("有题未填");
        return false;
      } else {
        //验证通过 发送请求
        this.request();
      }
    },
    //发送请求
    async request() {
      const result = await axios({
        url: "/api/docs/update",
        method: "post",
        data: {
          id: this.id, //问卷id
          title: this.docs.title, //问卷标题
          userid: util.getUserInfo().id, //填写人id
          resultList: this.resultList,
        },
      });
      if (result.data.code == 0) {
        //填写成功
        this.$toast.success("提交成功");
        //跳转结果页
        this.$router.replace({
          path: "/result",
          query: {
            current: 1,
          },
        });
      } else {
        this.$toast.fail("网络错误，稍后再试");
      }
      // console.log(result);
    },
  },
  mounted() {
    //获取id
    this.id = this.$route.query.id;
    //获取问卷
    this.getDocs();
  },
};
</script>


<style lang="less" scoped>
.detail {
  min-height: 90vh;
  padding-bottom: 60px;
  .title {
    width: 100%;
    background-color: #fff;
    color: #23a9f2;
    height: 70px;
    padding: 15px 20px;
    font-size: 22px;
    font-weight: 700;
    box-sizing: border-box;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .info_wrap {
    background-color: #fff;
    padding: 10px 20px;
    .info_text {
      width: 100%;
      height: 70px;
      border-radius: 12px;
      border: 1px solid #ccc;
      font-size: 16px;
      padding: 12px;
      box-sizing: border-box;
    }
  }
  .list {
    .ques_item {
      box-sizing: border-box;
      background-color: #fff;
      padding-top: 15px;
      padding-bottom: 13px;
      .ques_item_title {
        font-size: 16px;
        padding-left: 10px;
        span {
          margin-right: 3px;
        }
        .ques_item_required_icon {
          color: #f52e2a;
        }
        .ques_item_index {
          font-weight: 600;
        }
        .ques_item_type {
          color: #999;
          margin-left: 3px;
        }
      }
      .ques_item_content_wrap {
        box-sizing: border-box;
        padding-left: 5%;
        padding-right: 5%;
        margin-top: 16px;
        .ques_item_option_wrap {
          box-sizing: border-box;
          padding-left: 14px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 15px;
          .ques_item_option_item {
            margin: 14px 0;
          }
        }
        .ques_item_fill_ipt {
          border: 1px solid #ccc;
          width: 90%;
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          padding-left: 12px;
        }
      }
    }
  }
  .save_btn_wrap {
    margin-top: 36px;
    margin-bottom: 20px;
    padding: 0 15px;
  }
}
</style>