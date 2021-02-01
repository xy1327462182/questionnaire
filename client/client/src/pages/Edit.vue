<template>
  <div class="edit">
    <div class="title">{{docs.docsName}}</div>
    <div class="info_wrap">
      <textarea 
        class="info_text" 
        placeholder="请输入问卷说明或简介（非必填）"
        v-model="docs.docsInfo"
      >
      </textarea>
    </div>
    <div class="list">
      <div class="ques_item" v-for="(item,index) in docs.questionList" :key="index">
        <div class="ques_item_title">
          <span class="ques_item_required_icon" v-if="item.must">*</span>
          <span class="ques_item_index">{{index+1}}.</span>
          <span class="ques_item_title_txt">{{item.title}}</span>
          <span class="ques_item_type" v-if="item.type==0">[单选题]</span>
          <span class="ques_item_type" v-if="item.type==1">[多选题]</span>
          <span class="ques_item_type" v-if="item.type==2">[打分题]</span>
          <span class="ques_item_type" v-if="item.type==3">[填空题]</span>
        </div>
        <div class="ques_item_option_wrap">

          <van-radio-group v-if="item.type==0">
            <van-radio 
              v-for="radio in item.option"
              :key="radio.name"
              :name="radio.name"
              icon-size="16px" 
              class="ques_item_option_item"
            >{{radio.name}}</van-radio>
          </van-radio-group>

          <van-checkbox-group v-if="item.type==1">
            <van-checkbox 
              v-for="check in item.option"
              :key="check.name"
              :name="check.name"
              icon-size="16px" 
              shape="square" 
              class="ques_item_option_item"
            >{{check.name}}</van-checkbox>
          </van-checkbox-group>

          <van-rate v-model="item.value" :count="10" gutter="10px" v-if="item.type==2"/>

          <input type="text" class="ques_item_fill_ipt" v-model="item.value" v-if="item.type==3">

        </div>
        <div class="ques_item_fun_wrap">
          <div class="ques_item_fun_item" @click="handleMoveUp(index)">
            <van-icon name="arrow-up" class="ques_item_fun_item_icon" />
            <span class="ques_item_fun_item_txt">上移</span>
          </div>
          <div class="ques_item_fun_item" @click="handleMoveDown(index)">
            <van-icon name="arrow-down" class="ques_item_fun_item_icon" />
            <span class="ques_item_fun_item_txt">下移</span>
          </div>
          <div class="ques_item_fun_item" @click="handleMoveDel(index)">
            <van-icon name="delete-o" class="ques_item_fun_item_icon" />
            <span class="ques_item_fun_item_txt">删除</span>
          </div>
        </div>
      </div>
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
        <div class="addItem_wrap" @click="handleAddItemClick">
          <div class="add_item" @click="current = 0">
            <van-icon name="records" class="add_item_icon" />
            <span class="add_item_txt">单选题</span>
          </div>
          <div class="add_item" @click="current = 1">
            <van-icon name="description" class="add_item_icon" />
            <span class="add_item_txt">多选题</span>
          </div>
          <div class="add_item" @click="current = 2">
            <van-icon name="star-o" class="add_item_icon" />
            <span class="add_item_txt">打分题</span>
          </div>
          <div class="add_item" @click="current = 3">
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
              <van-icon name="clear" class="option_item_icon" @click="delOption(index)" />
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
            <van-switch v-model="must" size="25px" />
          </div>
          <div class="required_option_wrap" v-show="current==2">
            <span class="required_option_txt">分数设置</span>
            <span class="score_num">10分</span>
          </div>
          <div class="save_question_btn">
            <van-button type="info" block round @click="saveQuestion">确认</van-button>
          </div>
        </div>
      </van-popup>
    </div>
    <div class="save_btn_wrap">
      <van-button type="primary" block round @click="publishDocs">发布问卷</van-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import util from '../util/index'

export default {
  data() {
    return {
      addShow: false,//添加模态框显示/隐藏
      configShow: false,//问题配置模态框显示/隐藏
      questionTitle: '',//问题标题
      must: false,//必填判断
      current: 0, //当前点击的问题配置 0单选 1多选 2打分 3填空
      optionList: [],//选项数组列表
      docs: {//问卷数据
        docsName: '',//问卷名称
        docsInfo: '',//问卷介绍/说明
        questionList: [],//问题列表
      }
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
    //初始化表单值
    initValue() {
      this.questionTitle = ''
      this.optionList = []
      this.must = false
    },
    handleAddItemClick() {
      //处理模态框显示
      this.handleModal()
      //初始化表单值
      this.initValue()
    },
    //添加选项点击事件
    addOptions() {
      let list = this.optionList
      list.push({
        name: '',
      })
      this.optionList = list
    },
    //删除选项点击事件
    delOption(index) {
      //删除点击项
      this.optionList.splice(index, 1)
    },
    //保存问题点击按钮
    saveQuestion() {
      //验证数据
      const validateRes = this.validateValue()
      if (validateRes) {
        //如果验证结果为 true
        //发送请求保存问题
        this.requestSaveQuestion()
      }
    },
    //验证数据
    validateValue() {
      if (!this.questionTitle) {
        //如果没有问题标题
        this.$toast.fail('请输入标题');
        return false
      }
      //标题查重
      let unique = true
      this.docs.questionList.forEach((item,index)=>{
        if (item.title == this.questionTitle) {
          //有重复
          unique = false
        }
      })
      if (!unique) {
        this.$toast.fail('问题标题重复');
        return false
      }
      if (this.current==0 || this.current==1) {
        //如果是单选或多选
        //1. 判断选项列表长度是否大于等于2
        if (this.optionList.length < 2) {
          this.$toast.fail('请至少输入两个选项');
          return false
        }
        //2. 判断选项是否为空
        let filterArr = this.optionList.filter((item,index)=>{
          return !item.name
        })
        if (filterArr.length > 0) {
          this.$toast.fail('请输入选项');
          return false
        }
        //3.判断选项是否重复
        let repeatArr = []
        this.optionList.forEach((item,index)=>{
          if (repeatArr.indexOf(item.name) == -1) {
            repeatArr.push(item.name)
          }
        })
        console.log(repeatArr);
        console.log(this.optionList);
        if (repeatArr.length != this.optionList.length) {
          this.$toast.fail('选项重复'); 
          return false
        }
        return true
      } else if (this.current==2) {
        //如果是打分，处理一下选项数据
        let scoreList = []
        for (let i=1;i<11;i++) {
          scoreList.push({
            name: i,//选项名就是索引值
          })
        }
        this.optionList = scoreList
        return true
      } else if (this.current==3) {
        return true
      }
    },
    //发送请求 保存问题
    async requestSaveQuestion() {
      this.$toast.loading('保存中');
      const result = await axios({
        url: '/api/ques',
        method: 'post',
        data: {
          title: this.questionTitle,
          type: this.current,
          must: this.must,
          option: this.optionList,
          author: util.getUserInfo().id
        }
      })
      if (result.data.code == 0) {
        //添加成功
        this.$toast.success(result.data.message);
        // console.log(result.data.data);
        //隐藏模态框
        this.addShow = false;
        this.configShow = false;
        //将该问题数据添加到问卷中
        this.addDocsQuestion(result.data.data)
      } else {
        this.$toast.fail(result.data.message);
      }
    },
    //向问卷中添加问题
    addDocsQuestion(data) {
      let list = this.docs.questionList
      list.push(data)
      this.docs.questionList = list
      // console.log(this.docs.questionList);
    },
    //题目上移
    handleMoveUp(index) {
      if (index == 0) {
        this.$toast.fail('已经到顶了');
        return
      }
      let temp = this.docs.questionList[index - 1]
      this.$set(this.docs.questionList, index - 1, this.docs.questionList[index])
      this.$set(this.docs.questionList, index, temp)
      this.$toast.success('移动成功');
    },
    //题目下移
    handleMoveDown(index) {
      if (index == (this.docs.questionList.length - 1)) {
        this.$toast.fail('已经到底了');
        return
      }
      let temp = this.docs.questionList[index + 1]
      this.$set(this.docs.questionList, index + 1, this.docs.questionList[index])
      this.$set(this.docs.questionList, index, temp)
      this.$toast.success('移动成功');
    },
    //题目删除
    async handleMoveDel(index) {
      this.$toast.loading('删除中');
      //发送请求
      const result = await axios({
        url: '/api/ques/del',
        method: 'get',
        params: {
          id: this.docs.questionList[index]._id
        }
      })
      if (result.data.code == 0) {
        //删除成功
        this.docs.questionList.splice(index,1)
        this.$toast.success('删除成功');
      } else {
        this.$toast.fail(result.data.message);
      }
    },
    //发布问卷
    async publishDocs() {
      //验证问卷
      if (!this.docs.docsName) {
        this.$toast.fail('没有问卷名');
        return
      }
      if (this.docs.questionList.length <= 0) {
        this.$toast.fail('没有设置题目');
        return
      }
      this.$toast.loading('发布中');
      //处理数据
      let newQuestionList = []
      this.docs.questionList.forEach((item,index)=>{
        let options = []
        item.option.forEach((opt)=>{
          //问题选项中每一项添加填写人数字段
          options.push({
            name: opt.name,
            resNums: 0
          })
        })
        //问题数据对象处理
        let quesObj = {
          questionId: item._id,
          title: item.title,
          type: item.type,
          must: item.must,
          options: options,
          valueList: []
        }
        newQuestionList.push(quesObj)
      })
      //最终问卷数据
      let data = {
        title: this.docs.docsName,
        info: this.docs.docsInfo,
        author: util.getUserInfo().id,
        questionList: newQuestionList,
        responseNums: 0
      }
      //发送请求 添加问卷
      const result = await axios({
        url: '/api/docs',
        method: 'post',
        data: data
      })
      if (result.data.code == 0) {
        //添加成功
        this.$toast.success('发布成功');
        //去结果页
        this.$router.replace({
          path: '/result',
          query: {
            current: 0
          }
        })
      } else {
        this.$toast.fail(result.data.message);
      }
    }
  },
  created() {
    this.docs.docsName = this.$route.query.docsName
  }
};
</script>

<style lang="less" scoped>
.edit {
  min-height: 90vh;
  background-color: #efefef;
  padding-bottom: 60px;
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
    border-bottom: 1px dashed #23a9f2;
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
  .list{
    .ques_item{
      box-sizing: border-box;
      border: 1px dashed #23a9f2;
      background-color: #fff;
      margin-top: 20px;
      padding-top: 15px;
      .ques_item_title{
        font-size: 16px;
        padding-left: 10px;
        span{
          margin-right: 3px;
        }
        .ques_item_required_icon{
          color:  #f52e2a;
        }
        .ques_item_index{
          font-weight: 600;
        }
        .ques_item_type{
          color: #999;
          margin-left: 3px;
        }
      }
      .ques_item_option_wrap{
        font-size: 15px;
        padding-left: 18px;
        margin: 18px 0;
        .ques_item_option_item{
          margin: 14px 0;
        }
        .ques_item_fill_ipt{
          border: 1px solid #ccc;
          width: 90%;
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          padding-left: 12px;
        }
      }
      .ques_item_fun_wrap{
        width: 100%;
        box-sizing: border-box;
        border-top: .3px solid #ddd;
        padding-left: 50px;
        padding-right: 50px;
        padding-top: 6px;
        padding-bottom: 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .ques_item_fun_item{
          color: #999;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          align-items: center;
          .ques_item_fun_item_icon{
            font-size: 20px;
          }
          .ques_item_fun_item_txt{
            font-size: 14px;
            margin-top: 2px;
          }
        }
      }
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