<template>
  <div class="KYandLS">
    <div class="commonTitle">
      <img :src="data.sectionPic" />
        <span>
          <span class="fontsize22 color666">查看全部</span>
          <span class="iconfont icon-youjiantou1 color666"></span>
        </span>
    </div>
    <div class="KYandLS_contentBigBox_wrap">
      <div v-if="dataList.length" class="KYandLS_contentBigBox" ref="scrollWrap">
       
        <div class="KYandLS_content bb1px" v-for="index in row" :key="index">
          <div class="KYandLS_prdSmalBox" w-224-179 aspectratio v-for="(item) in dataList.slice((index-1) * 3, 3 * index)" :key='item.id' @tap="goNewPage({dataType: data.dataType, id: item.id})">
            <div v-if="item.activityType" class="tag-icon">
              <img src="@/images/tag-icon-index@2x.png" alt="">
            </div>
            <img aspectratio-content :src="item.coverPic" />
          </div>
        </div>
      </div>
      <div class="empty_block" v-else>
        <img src="@/images/hasNoProduct@2x.png" alt="暂无商品">
      </div>
    </div>

  </div>
</template>

<style lang="less">
.empty_block {
  padding: 20px 0;
  img {
    width: 315px;
    height: 256px;
    margin: 0 auto;
  }
}
.KYandLS {
  .tag-icon {
    position: absolute;
    width: 54px;
    height: 46px;
    right: 0;
    top: 0;
  }
  .KYandLS_contentBigBox_wrap {
    width: 100%;
    padding: 0 24px;
  }
  .KYandLS_content {
    width: 100%;
    display: flex;
    background-color: #fff;
    padding: 20px 0;
    // justify-content: space-between;
    .KYandLS_prdSmalBox {
      width: 224px;
      margin-right: 15px;
      border: 1px solid #efeff4;
    }
    .KYandLS_prdSmalBox:last-child {
      margin-right: 0;
    }
  }
}
</style>

<script>
import BScroll from 'better-scroll';

const list = [];
export default {
  name: 'template-3',
  props: {
    data: {
      type: null,
      default: false,
    },
    dataList: {
      type: Array,
      default: () => list,
    },
    goAllPage: {
      type: Function,
    },
    goNewPage: {
      type: Function,
    },
  },
  computed: {
    row() {
      const length = this.dataList.length;
      return Math.ceil(length / 3);
    },
  },
  mounted() {
  },
};
</script>
