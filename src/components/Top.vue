<template>
  <div>
    <!-- <div>{{this.$store.state.topicsData}}</div> -->
    <ul class="topic_content" v-if="topicsData">
      <li v-for="(item, index) in topicsData" :key="index">
        <div class="author" @click="showDetailAboutAthor(item.author.loginname)">
          <img :src="item.author.avatar_url" alt="用户图像" :title="item.author.loginname">
        </div>
        <span class="count_wrapper">
          <span class="reply_count">{{item.reply_count}}</span> / <span
          class="visit_count">{{item.visit_count}}</span>
          </span>

        <div class="topic_title">
          <span class="top" v-if="item.top">置顶</span>
          <span class="good" v-else-if="item.good">精华</span>
          <span class="ask" v-else-if="item.tab === 'ask'">问答</span>
          <span class="ask" v-else-if="item.tab === 'share'">分享</span>
          <span v-else></span>
          <a class="title" title="item.title" :class="{ask_color:item.tab === 'ask'}"
              @click="getTopicsDetail(item.id, 0, item.author.loginname)">{{item.title}}</a>
        </div>

        <div class="send_time">
          <!--这里没有提供对应的接口，图片就不展示了-->
          <!--<div class="img_wrapper"><img src="" alt=""></div>-->
          <span class="time">{{item.last_reply_at}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
 import axios from 'axios'

export default {
   data () {
     return {
       topicsData: ''
     }
   },
   mounted () {
     // this.topicsData = this.$store.state.topicsData
     axios.get('https://cnodejs.org/api/v1/topics', {
       params: {
         page: 1,
         tab: 'good'
       }
     }).then((res) => {
       this.topicsData = res.data.data
       this.$store.state.topicsData = res.data.data
     })
   }
}
</script>
<style scoped>
.topic_content {
  background: #fff;
  font-size: 12px;
  width:1200px;
  margin: 0 auto;
}
.topic_content li {
  border-bottom: 1px solid #ddd;
  line-height: 30px;
  padding: 10px;
  display: flex;
  display: -webkit-flex;
  -webkit-align-items: center;
  align-items: center;
}
.topic_content li:hover {
  background: #f5f5f5;
  cursor: pointer;
}
.topic_content li .author {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
}
.topic_content li .author img {
  width: 100%;
  border-radius: 2px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
}
.topic_content li .count_wrapper {
  width: 80px;
  flex-shrink: 0;
  text-align: center;
}
.topic_content li .count_wrapper .reply_count {
  color: #A478C0;
}
.topic_content li .count_wrapper .visit_count {
  color: #B4B4B4;
}
.topic_content li .topic_title {
  flex: 1;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
}
.topic_content li .topic_title .top,
.topic_content li .topic_title .good,
.topic_content li .topic_title .ask {
  border-radius: 2px;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  margin-right: 5px;
  padding: 2px 5px;
  white-space: nowrap;
}
.topic_content li .topic_title .top,
.topic_content li .topic_title .good {
  background: #80BD01;
  color: #fff;
}
.topic_content li .topic_title .ask {
  background: #ddd;
  color: #000;
}
.topic_content li .topic_title .title {
  display: inline-block;
  font-size: 14px;
  width: 85%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
}
.topic_content li .topic_title .title:hover {
  text-decoration: underline;
  cursor: pointer;
}
.topic_content li .topic_title .ask_color {
  color: #333;
}
.topic_content li .send_time {
  display: flex;
  display: -webkit-flex;
  -webkit-align-items: center;
  align-items: center;
  flex-shrink: 0;
  width: 80px;
  text-align: right;
}
.topic_content li .send_time .img_wrapper {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 1px solid red;
}
.topic_content li .send_time .time {
  flex: 1;
}
</style>


