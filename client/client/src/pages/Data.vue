<template>
  <div class="data">
    <div class="top_bar">统计结果</div>
    <div class="list">
      <div class="ques_item" v-for="(item,index) in docs.questionList" :key="index">
        <div class="ques_title_wrap">
          <span class="index">第{{index+1}}题：</span>
          <span class="ques_title">{{item.title}}</span>
          <span class="ques_type" v-if="item.type==0">[单选题]</span>
          <span class="ques_type" v-if="item.type==1">[多选题]</span>
          <span class="ques_type" v-if="item.type==2">[打分题]</span>
          <span class="ques_type" v-if="item.type==3">[填空题]</span>
        </div>

        <div class="table_wrap">
          <table class="table" v-if="item.type != 3">
            <tbody>
              <tr>
                <th>选项</th>
                <th>小计</th>
                <th>百分比 %</th>
              </tr>
              <tr v-for="option in item.options" :key="option._id">
                <td>{{option.name}}</td>
                <td>{{option.resNums}}</td>
                <td>{{Number((option.resNums / docs.responseNums) * 100).toFixed(2)}}</td>
              </tr>
            </tbody>
          </table>

          <table class="table"  v-if="item.type == 3">
            <tbody>
              <tr>
                <th>序号</th>
                <th>答案文本</th>
              </tr>
              <tr v-for="(txt,index) in item.valueList" :key="index">
                <td>{{index+1}}</td>
                <td>{{txt}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      id: '',
      docs: {}
    }
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
        console.log(this.docs);
      } else {
        this.$toast.fail(result.data.message);
      }
    },
  },
  mounted() {
    this.id = this.$route.query.id 
    //获取问卷
    this.getDocs()
  }
};
</script>

<style lang="less" scoped>
.data {
  background-color: #eee;
  min-height: 90vh;
  padding-bottom: 60px;
  .top_bar {
    background-color: #fff;
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
  }
  .list {
    box-sizing: border-box;
    margin-top: 15px;
    padding-left: 5%;
    padding-right: 5%;
    background-color: #fff;
    .ques_item {
      padding-top: 20px;
      padding-bottom: 20px;
      .ques_title_wrap {
        display: flex;
        align-items: center;
        font-size: 16px;
        .index {
          color: #999;
          font-weight: 700;
          margin-right: 6px;
        }
        .ques_title {
          color: #222;
          margin-right: 5px;
        }
        .ques_type {
          color: #999;
        }
      }
      .table_wrap {
        margin-top: 20px;
        .table {
          border-collapse: collapse;
          width: 100%;
          margin-bottom: 4px;
          margin-top: 4px;
          font-size: 16px;
          tr {
            background-color: #f6f4f0;
            th {
              color: #fff;
              background-color: #555;
              border: 1px solid #555;
              font-size: 12px;
              padding: 3px;
              vertical-align: top;
              text-align: left;
            }
            td {
              line-height: 2em;
              border: 1px solid #d4d4d4;
              padding: 5px;
              padding-top: 7px;
              padding-bottom: 7px;
              vertical-align: top;
            }
            &:nth-child(2n) {
              background-color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>