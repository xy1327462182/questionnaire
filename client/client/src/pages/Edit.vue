<template>
  <div class="edit">
    <div class="title">{{docsName}}</div>
    <div class="info_wrap">
      <textarea 
        class="info_text" 
        placeholder="请输入问卷说明或简介（非必填）"
        v-model="docsInfo"
      >
      </textarea>
    </div>
    <div class="add_btn_wrap">
      <van-button
        type="primary"
        block
        plain
        hairline
        @click="addShow = !addShow"
      >
        添加题目
      </van-button>
      <van-popup
        v-model="addShow"
        position="bottom"
        round
        :style="{ height: '40%' }"
        class="addModal"
      >
        <div class="addItem_wrap">
          <div class="add_item" @click="handleRadioClick">
            <van-icon name="records" class="add_item_icon" />
            <span class="add_item_txt">单选题</span>
          </div>
          <div class="add_item" @click="handleCheckedClick">
            <van-icon name="description" class="add_item_icon" />
            <span class="add_item_txt">多选题</span>
          </div>
          <div class="add_item" @click="handleScoreClick">
            <van-icon name="star-o" class="add_item_icon" />
            <span class="add_item_txt">打分题</span>
          </div>
          <div class="add_item" @click="handleFillClick">
            <van-icon name="font-o" class="add_item_icon" />
            <span class="add_item_txt">填空题</span>
          </div>
        </div>
      </van-popup>
      <van-popup
        v-model="configShow"
        class="configModal"
        round
        position="bottom"
        :style="{ height: '76%' }"
      >
        <div class="radio_wrap">
          <div class="radio_title" v-show="current == 0">单选题</div>
          <div class="radio_title" v-show="current == 1">多选题</div>
          <div class="radio_title" v-show="current == 2">打分题</div>
          <div class="radio_title" v-show="current == 3">填空题</div>
          <div class="form_title_wrap">
            <p class="form_title_txt">
              <span class="required_icon">* </span>标题
            </p>
            <textarea
              class="form_title_content"
              v-model="questionTitle"
              placeholder="请输入标题"
            ></textarea>
          </div>
          <div class="form_line">设置</div>
          <div class="options_list" v-show="current==0 || current==1">
            <div 
              class="option_item" 
              v-for="(item,index) in optionList"
              :key="index"  
            >
              <van-icon name="clear" class="option_item_icon" />
              <input type="text" v-model="item.name" class="option_item_ipt" placeholder="请输入选项">
            </div>
          </div>
          <div 
            class="add_option" 
            v-show="current==0 || current==1"
            @click="addOptions"
          >
            <van-icon name="add" class="add_option_icon"/>
            <span class="add_option_txt">添加选项</span>
          </div>
          <div class="required_option_wrap">
            <span class="required_option_txt">此题目必须作答</span>
            <van-switch v-model="required" size="25px" />
          </div>
          <div class="required_option_wrap" v-show="current==2">
            <span class="required_option_txt">分数设置</span>
            <span class="score_num">10分</span>
          </div>
          <div class="save_question_btn">
            <van-button type="info" block round>确认</van-button>
          </div>
        </div>
      </van-popup>
    </div>
    <div class="save_btn_wrap">
      <van-button type="primary" block round>保存问卷</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      docsName: '',//问卷名称
      docsInfo: '',//问卷介绍/说明
      addShow: false,//添加模态框显示/隐藏
      configShow: false,//问题配置模态框显示/隐藏
      questionTitle: '',//问题标题
      required: false,//必填判断
      current: 0, //当前点击的问题配置 0单选 1多选 2打分 3填空
      value1: '',
      optionList: [],//选项数组
    };
  },
  methods: {
    //处理模态框显示
    handleModal() {
      if (!this.configShow) {
        //添加模态框隐藏
        this.addShow = false;
        //问题配置模态框显示
        this.configShow = true;
      }
    },
    //单选点击事件
    handleRadioClick() {
      //处理模态框显示
      this.handleModal()
      //更新当前点击索引
      this.current = 0
    },
    //多选点击事件
    handleCheckedClick() {
      //处理模态框显示
      this.handleModal()
      //更新当前点击索引
      this.current = 1
    },
    //添加选项点击事件
    addOptions() {
      let list = this.optionList
      list.push({
        name: '',
      })
      this.optionList = list
    },
    //打分题点击
    handleScoreClick() {
      //处理模态框显示
      this.handleModal()
      //更新当前点击索引
      this.current = 2
    },
    //填空点击
    handleFillClick() {
      //处理模态框显示
      this.handleModal()
      //更新当前点击索引
      this.current = 3
    }
  },
  created() {
    this.docsName = this.$route.query.docsName
  }
};
</script>

<style lang="less" scoped>
.edit {
  min-height: 90vh;
  background-color: #eee;
  .title {
    width: 100%;
    background-color: #fff;
    height: 70px;
    padding: 15px 20px;
    border-top: 1px dashed #23a9f2;
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
      resize: none;
      border-radius: 12px;
      border: 1px solid #ccc;
      font-size: 16px;
      padding: 12px;
      box-sizing: border-box;
    }
  }
  .add_btn_wrap {
    margin-top: 40px;
    padding: 0 15px;
    .addModal {
      padding: 18px 12px;
      background-color: #ddd;
      box-sizing: border-box;
      .addItem_wrap {
        width: 100%;
        background-color: #eee;
        border-radius: 5px;
        display: flex;
        flex-flow: row wrap;
        .add_item {
          width: 25%;
          padding-top: 15px;
          padding-bottom: 15px;
          box-sizing: border-box;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          align-items: center;
          .add_item_icon {
            font-size: 24px;
            font-weight: 550;
          }
          .add_item_txt {
            margin-top: 8px;
            font-size: 14px;
            color: #999;
          }
        }
      }
    }
    .configModal {
      padding: 18px 0;
      box-sizing: border-box;
      .radio_wrap {
        .radio_title {
          width: 100%;
          height: 30px;
          font-size: 18px;
          text-align: center;
        }
        .form_title_wrap {
          padding-left: 18px;
          padding-right: 18px;
          margin-bottom: 25px;
          box-sizing: border-box;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          .form_title_txt {
            font-size: 15px;
            color: #999;
            .required_icon {
              color: #f10;
            }
          }
          .form_title_content {
            border: 1px solid #ccc;
            height: 70px;
            border-radius: 8px;
            resize: none;
            font-size: 16px;
            padding: 8px 10px;
            box-sizing: border-box;
          }
        }
        .options_list{
          padding-left: 18px;
          .option_item{
            width: 100%;
            height: 50px;
            border-bottom: 1px solid #eee;
            display: flex;
            align-items: center;
            .option_item_icon{
              color: #ee0a24;
              font-size: 23px;
            }
            .option_item_ipt{
              border: 0;
              outline: none;
              margin-left: 14px;
              height: 25px;
              line-height: 25px;
              font-size: 14px;
            }
          }
        }
        .form_line {
          height: 25px;
          line-height: 25px;
          text-align: center;
          font-size: 14px;
          color: #888;
          background-color: #eee;
        }
        .add_option{
          width: 100%;
          height: 50px;
          padding-left: 18px;
          border-bottom: 1px solid #efefef;
          box-sizing: border-box;
          color: #21a4f1;
          display: flex;
          align-items: center;
          .add_option_icon{
            font-size: 23px;
          }
          .add_option_txt{
            font-size: 15px;
            margin-left: 15px;
          }
        }
        .required_option_wrap{
          width: 100%;
          height: 50px;
          border-bottom: 1px solid #efefef;
          padding-left: 18px;
          padding-right: 18px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .required_option_txt{
            font-size: 16px;
          }
          .score_num{
            font-size: 16px;
          }
        }
        .save_question_btn{
          padding-left: 18px;
          padding-right: 18px;
          margin-top: 20px;
          box-sizing: border-box;
        }
      }
    }
  }
  .save_btn_wrap {
    margin-top: 36px;
    padding: 0 15px;
  }
}
</style>