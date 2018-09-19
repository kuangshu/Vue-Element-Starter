<template>
  <!-- <div>
    hahaha{{schoolId}}
  </div> -->
  <div class="index">
    <!-- <mainheader></mainheader> -->
    <indexScroll class="index-content-wrap" ref='mainScrollWrap'>
      <div class="index-content">
        <!--轮播-->
        <div class="banner LBbox">
          <slider v-if="bannerData.length > 1" ref="slider" :autoPlay='true' :loop='true' :showDot='true'>
            <div class="LBbox-item" v-for="item in bannerData" :key='item.id'>
              <img :src="item.roundPic" height="220px" />
            </div>
          </slider>
          <div v-else-if="bannerData.length == 1">
            <img :src="bannerData[0].roundPic" height="220px" alt="" />
          </div>
        </div>
        <!--四大类-->
        <div class="fourPart positionR">
          <div class="fourPart_inner">
            <div class="textCenter">
              <img id="testgopage" src="@/images/1@2x.png" />
              <p class="">卖家中心</p>
            </div>
            <div class="textCenter">
              <img src="@/images/2@2x.png" />
              <p>配送员中心</p>
            </div>
            <div class="textCenter">
              <img src="@/images/3@2x.png" />
              <p>我的订单</p>
            </div>
            <div class="textCenter">
              <img src="@/images/4@2x.png" />
              <p>我的收藏</p>
            </div>
          </div>
        </div>
        <template v-for="blockItem in indexData">
          <!--格子铺-->
          <div :key="blockItem.id" class="GZ" v-if="blockItem.styleCode === 'TEMPLATE_1'">
            <div class="commonTitle">
              <img :src="blockItem.sectionPic" />
              <span>
                <div>
                  <span class="fontsize22 color666">查看全部</span>
                  <span class="iconfont icon-youjiantou1 color666"></span>
                </div>
              </span>
            </div>
            <div class="GZ_content clearFloat" v-if="gzData.length">
              <div class="floatL GZ_imgSmallBox" v-for="(item) in gzData" :key='item.id' aspectratio w-340-272>
                <img :src="item.coverPic" aspectratio-content />
                <p class="title">
                  <span class="floatL  gz-p-name ellipsis">{{item.productName}}</span>
                  <span class="floatR priceFont">&yen;{{item.price}}</span>
                </p>
              </div>
            </div>
            <div class="empty_block" v-else>
              <img src="@/images/hasNoProduct@2x.png" alt="暂无商品">
            </div>
          </div>
          <!--量版专区-->
          <div :key="blockItem.id" class="LB" v-else-if="blockItem.styleCode === 'TEMPLATE_2'">
            <div class="commonTitle">
              <img :src="blockItem.sectionPic" />
              <span>
                <span class="fontsize22 color666">查看全部</span>
                <span class="iconfont icon-youjiantou1 color666"></span>
              </span>
            </div>
            <div class="LB_content" v-if="lfData.length">
              <div class="LB_copimg borderBotmEB">
                <div v-for="(item) in lfTop" :key='item.id' class="clearFloat LB_imgBox" aspectratio w-224-179>
                  <div v-if="item.activityType" class="tag-icon">
                    <img src="@/images/tag-icon-index@2x.png" alt="">
                  </div>
                  <img aspectratio-content :src="item.coverPic" />
                  <p class="LB_copimg_title">
                    <span class="floatL  gz-p-name ellipsis">{{item.productName}}</span>
                    <span class="floatR priceFont">&yen;{{item.skuPrice}}</span>
                  </p>
                </div>
              </div>
              <div class="LB_oneimg borderBotmEB" v-for="(item) in lfList" :key='item.id'>
                <div class="LB_oneimg_box">
                  <!-- 左边图 -->
                  <div class="LB_oneimg_box_left" w-224-179 aspectratio>
                    <div v-if="item.activityType" class="tag-icon">
                      <img src="@/images/tag-icon-index@2x.png" alt="">
                    </div>
                    <img aspectratio-content :src="item.coverPic" />
                  </div>
                  <div class="LB_oneimg_box_right LB_singleContent">
                    <p class="colorDarkGry LB_oneimg_box_right_title">{{item.productName}}</p>
                    <p class="LB_oneimg_box_right_price">
                      <span class="price_box">
                        <span class="priceFont">&yen;{{item.skuPrice}}</span>
                        /
                        <span class="skuinfo color666 fontsize22 ellipsis">{{item.skuName}}</span>
                      </span>
                      <span class="sallcount color999 floatL fontsize22">销量{{item.saleCount}}</span>
                    </p>
                    <div class="LB_oneimg_box_right_xl">
                      <span class="shop-name ellipsis">{{item.shopName}}</span>
                      <!-- <span class="shop-name">店铺名字</span> -->
                      <span class="jindian">进店&nbsp;&nbsp;> &nbsp; </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="empty_block" v-else>
              <img src="@/images/hasNoProduct@2x.png" alt="暂无商品">
            </div>
          </div>
          <!--酷饮/零食专区-->
          <template-3 :key="blockItem.id" v-else-if="blockItem.styleCode === 'TEMPLATE_3' && tem3Data[blockItem.id]" :data="blockItem" :dataList="tem3Data[blockItem.id]"></template-3>
          <!--店铺推荐-->
          <div :key="blockItem.id" class="DP" v-else-if="blockItem.styleCode === 'TEMPLATE_4' && shopData.length">
            <div class="commonTitle">
              <img :src="blockItem.sectionPic" />
              <span>
                <span class="fontsize22 color666">查看全部</span>
                <span class="iconfont icon-youjiantou1 color666"></span>
              </span>
            </div>
            <div class="DP_content self-content-padded clearFloat">
              <div class="DP_item_box" aspectratio w-340-272 v-for="(item) in shopData" :key="item.id">
                <img aspectratio-content :src="item.coverPic" />
                <p class="title ellipsis">{{item.shopName}}</p>
              </div>
            </div>
          </div>
          <!-- 足迹 -->
          <!-- <div :key="blockItem.id" class="ZJ" v-else-if="blockItem.styleCode === 'TEMPLATE_5'">
            <div class="commonTitle" style="background-color: #fff;">
              <img :src="blockItem.sectionPic" />
            </div>
            <div class="ZJ_content" v-if="zjData.length">
              <div class="ZJ_column1">
                <v-touch class="ZJ_box" v-for="(item, index) in zjLeft" :key='index' @tap="goNewPage({dataType: dataType['zjData'], id: item.id})">
                  <img v-lazy="item.coverPic" />
                  <p class="title colorDarkGry fontsize26">{{item.productName}}</p>
                  <p>
                    <span class="priceFont fontsize38">&yen;{{item.skuPrice}}</span>
                    <span class="color999">月销
                      <span>{{item.saleCount}}</span>
                    </span>
                  </p>
                </v-touch>
              </div>
              <div class="ZJ_column2">
                <v-touch class="ZJ_box" v-for="(item, index) in zjRight" :key='index' @tap="goNewPage({dataType: dataType['zjData'], id: item.id})">
                  <img v-lazy="item.coverPic" />
                  <p class="title colorDarkGry fontsize26">{{item.productName}}</p>
                  <p>
                    <span class="priceFont fontsize38">&yen;{{item.skuPrice}}</span>
                    <span class="color999">月销
                      <span>{{item.saleCount}}</span>
                    </span>
                  </p>
                </v-touch>
              </div>
            </div>
          </div> -->
          <!--广告-->
          <!-- <div :key="blockItem.id" class="AD" v-else-if="blockItem.styleCode === 'TEMPLATE_6'">
            <v-touch class="AD_box" @tap="goNewPage({dataType: blockItem.dataType, id: blockItem.sectionName, link: blockItem.jumpLink})">
              <img v-lazy="adData.sectionPic" />
              <div class="AD_title colorRed">广告</div>
            </v-touch>
          </div> -->
        </template>
      </div>
    </indexScroll>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import indexScroll from '@/components/scroll';
import slider from '@/components/slider';
import template3 from './blockTmp3';
export default {
  name: 'preview',
  props: {
    schoolId: String,
  },
  components: {
    indexScroll,
    slider,
    [template3.name]: template3,
  },
  data() {
    //  return {
    //   dataType: {}, // 页面中区块数据请求类型 以区块名为key
    //   gzData: [], // 线下格子列表
    //   lfData: [], // 量贩专区列表
    //   adData: {}, // 广告
    //   tem3Data: {}, // 零食专区列表
    //   shopData: [], // 推荐店铺列表
    // };
    return {
      userId: '', // 用户信息
      campusId: '', // 校区信息
      pullDownRefreshConfig: {
        threshold: 90,
        stop: 40,
        txt: '刷新成功',
      },
      pullUpLoadConfig: {
        threshold: 0,
        txt: {
          more: '上拉加载更多',
          noMore: '噢吼！只有这么多了',
        },
      },
      dataType: {}, // 页面中区块数据请求类型 以区块名为key
      gzData: [], // 线下格子列表
      lfData: [], // 量贩专区列表
      adData: {}, // 广告
      tem3Data: {}, // 零食专区列表
      shopData: [], // 推荐店铺列表
      zjData: [], // 足迹列表
      zjParam: {},
      zjPagination: {
        id: '',
        pageSize: 5,
      }, // 足迹分页信息
    };
  },
  computed: {
    ...mapGetters('operationStore/schoolStore', ['bannerData', 'indexData']),
    lfTop() {
      return this.lfData.filter((item, index) => index < 3);
    },
    lfList() {
      return this.lfData.filter((item, index) => index > 2);
    },
    zjLeft() {
      return this.zjData.filter((item, index) => !(index % 2));
    },
    zjRight() {
      return this.zjData.filter((item, index) => !!(index % 2));
    },
  },
  watch: {
    schoolId(myNew, myOld) {
      // console.log('观察');
      // console.log(myNew);
      this.initData();
    },
  },
  created() {
    // console.log("created模版预览")
    this.initData();
  },

  methods: {
    ...mapActions('operationStore/schoolStore', [
      'fetchIndexBannerData',
      'fetchIndexData',
    ]),
    initData() {
      return new Promise(resolve => {
        this.fetchIndexData({
          campusId: this.schoolId,
        }).then(indexDataList => {
          console.log('indexDataList');
          console.log(indexDataList);
          this.indexData.map(blockItem => {
            let param = blockItem.interfacePara;
            param === null || param === ''
              ? (param = {})
              : (param = eval('(' + param + ')'));
            blockItem.styleCode === 'TEMPLATE_6'
              ? (this.adData = blockItem)
              : this.getBlockData({ ...blockItem, param });
          });
        });

        // console.log('校区ID');
        // console.log(this.schoolId);
        this.fetchIndexBannerData({
          campusId: this.schoolId,
        }).then(() => {});
      });
    },
    getBlockData(blockItem) {
      console.log('blockItem');
      console.log(blockItem);
      const name = blockItem.sectionName;
      const sid = blockItem.dataInterface;
      const code = blockItem.styleCode;
      const dataType = blockItem.dataType;
      const param = blockItem.param;
      switch (code) {
        case 'TEMPLATE_1':
          this.dataType['gzData'] = dataType;
          this.gzData = blockItem.data;
          break;
        case 'TEMPLATE_2':
          this.dataType['lfData'] = dataType;
          this.lfData = blockItem.data;
          break;
        case 'TEMPLATE_3':
          this.dataType['tem3Data'] = dataType;
          this.tem3Data[blockItem.id] = blockItem.data;
          // console.log('tem3Data');
          // console.log(tem3Data);
          break;
        case 'TEMPLATE_4':
          this.dataType['shopData'] = dataType;
          this.shopData = blockItem.data;
          break;
        // 足迹
        default:
          break;
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less">
[aspectratio] {
  position: relative;
}
[aspectratio]::before {
  content: '';
  display: block;
  width: 1px;
  margin-left: -1px;
  height: 0;
}
[aspectratio-content] {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
[w-340-272] {
  aspect-ratio: '340:272';
}
[w-224-179] {
  aspect-ratio: '224:179';
}
.empty_block {
  padding: 20px 0;
  text-align: center;
  img {
    width: 315px;
    height: 256px;
  }
}
.ellipsis-lines(@n) {
  overflow: hidden;
  -webkit-line-clamp: @n;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}
.index {
  .tag-icon {
    position: absolute;
    width: 54px;
    height: 46px;
    right: 0;
    top: 0;
    z-index: 999;
  }
  .LBbox {
    width: 100%;
    height: 240px;
    overflow: hidden;
    .LBbox-item {
      width: 100%;
      height: 100%;
    }
  }
  .fourPart {
    position: relative;
    height: 175px;
    // .fourPart_inner_top {
    //   position: absolute;
    //   width: 100%;
    //   height: 58px;
    //   top: -57px;
    //   background-image: url('../../../images/banner-top.png');
    //   background-size: contain;
    // }
    .fourPart_inner {
      width: 100%;
      height: 100%;
      padding: 0 34px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    div {
      img {
        display: block;
        margin: 0 auto;
        width: 102px;
        height: 102px;
        margin-bottom: 10px;
      }
      p {
        margin: 0;
        font-size: 22px;
        color: #333;
      }
    }
  }
  .GZ_imgBox {
    background-color: #fff;
    .GZ_box {
      position: relative;
    }
    .GZ_inf {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 30px;
      line-height: 30px;
      background-color: pink;
      width: 100%;
      font-size: 14px;
    }
    div {
      img {
        width: 94%;
        display: block;
      }
    }
  }
  .GZ_content {
    background-color: #fff;
    margin: 20px 24px 10px;
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    .GZ_imgSmallBox {
      width: 260px;
      margin-bottom: 20px;
      border: 1px solid #efeff4;
    }
    .title {
      position: absolute;
      bottom: 0;
      margin: 0;
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 22px;
      background-color: rgba(255, 255, 255, 0.6);
      padding: 0 16px;
      display: flex;
      span {
        color: #333333;
      }
      .gz-p-name {
        flex: 1;
      }
      .priceFont {
        margin-right: 10px;
      }
    }
  }
  .commonTitle {
    background-color: #ebebeb;
    line-height: 80px;
    height: 80px;
    position: relative;
    img {
      position: absolute;
      left: 50%;
      margin-left: -155px;
      width: 310px;
      height: 80px;
    }
    span {
      display: inline-block;
      font-size: 22px;
      .iconfont {
        font-size: 30px;
      }
    }
    & > span {
      float: right;
      padding-right: 24px;
    }
  }
  .LB_content {
    background-color: #fff;
    margin: 20px 24px;
    .LB_copimg {
      display: flex;
      padding-bottom: 20px;
      .LB_copimg_title {
        position: absolute;
        bottom: 0;
        margin: 0;
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        background-color: rgba(255, 255, 255, 0.6);
        padding: 0 16px;
        display: flex;
        .gz-p-name {
          flex: 1;
        }
      }
      .LB_imgBox {
        width: 224px;
        margin-right: 15px;
        border: 1px solid #efeff4;
      }
      .LB_imgBox:last-child {
        margin: 0;
      }
    }
  }
  .LB_oneimg {
    padding: 20px 0;
    .LB_oneimg_box {
      display: flex;
      .LB_oneimg_box_left {
        width: 224px;
        height: 140px;
        border: 1px solid #efeff4;
      }
      .LB_oneimg_box_right {
        margin-left: 20px;
        flex: 1;
        height: 140px;
      }
      .LB_oneimg_box_right_title {
        height: 60px;
        line-height: 32px;
        font-size: 18px;
        margin: 6px 0 10px;
        color: #1e1e1e;
        .ellipsis-lines(2);
      }
      .LB_oneimg_box_right_price {
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
        .price_box {
          .skuinfo {
            display: inline-block;
            width: 180px;
            vertical-align: middle;
          }
        }
        .priceFont {
          font-size: 24px;
          color: #cd0000;
        }
        .sallcount {
          font-size: 18px;
          color: rgb(153, 153, 153);
        }
      }
      .LB_oneimg_box_right_xl {
        // height: 29px;

        font-size: 18px;
        display: flex;
        // justify-content: space-between;
        position: relative;
        color: rgb(102, 102, 102);
        .shop-name {
          width: 310px;
          color: rgb(153, 153, 153);
        }
      }
    }
    .LB_singleContent {
      p:last-child {
        span {
          display: inline-block;
          img {
            width: 52px;
            height: 39px;
          }
        }
      }
    }
  }
  .AD {
    margin: 20px 0 30px 0;
    .AD_box {
      position: relative;
      img {
        display: block;
        width: 100%;
        height: 170px;
      }
      div {
        position: absolute;
        right: 0px;
        top: 20px;
        background-color: rgba(255, 255, 255, 0.6);
        height: 42px;
        line-height: 42px;
        width: 90px;
        text-align: center;
        font-size: 26px;
      }
    }
  }

  .DP {
    .DP_content {
      width: 100%;
      background-color: #fff;
      padding: 20px 24px;
      display: flex;
      flex-flow: wrap;
      justify-content: space-between;
      .DP_item_box {
        width: 260px;
        margin-bottom: 20px;
        border: 1px solid #efeff4;
        .title {
          position: absolute;
          bottom: 0;
          margin: 0;
          width: 100%;
          height: 46px;
          line-height: 46px;
          text-align: center;
          background-color: rgba(255, 255, 255, 0.6);
          color: #333333;
          font-weight: bold;
          font-size: 26px;
        }
      }
    }
  }
  .ZJ {
    background: #efeff4;
    .commonTitle {
      height: 32px;
      display: flex;
      align-items: center;
    }
    .commonTitle img {
      width: 317px;
      height: 32px;
    }
    .ZJ_content {
      padding: 38px 24px;
      display: flex;
      justify-content: space-between;
      .ZJ_column1,
      .ZJ_column2,
      .ZJ_box {
        width: 341px;
        border: 1px solid #efeff4;
      }
      .ZJ_box {
        background-color: #fff;
        margin-bottom: 20px;
        overflow: hidden;
        p:first-of-type {
          margin-top: 15px;
          font-size: 26px;
          line-height: 32px;
          max-height: 64px;
          overflow: hidden;
          color: #333;
        }
        p:last-child {
          margin: 30px 0 22px;
          font-size: 22px;
        }
        p {
          padding: 0 15px;
        }
        img {
          width: 100%;
        }
        .priceFont {
          font-size: 38px;
          color: #cd0000;
          padding-right: 18px;
        }
      }
    }
  }
  .sm_content {
    padding-top: 70px !important;
    background-color: rgba(51, 51, 51, 0.5);
    position: fixed;
    z-index: 99999;
    width: 100%;
    .sm_title {
      padding-top: 5rem;
    }
    .sm_box {
      background-color: #fff;
      height: 12rem;
      width: 12rem;
      background-size: 100% 100%;
      margin: 0 auto;
    }
    .sm_prdPos {
      padding-top: 8.5rem;
    }
  }
  .pullup-wrapper {
    background: #efeff4;
  }
  .index-content-wrap {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
.textRight {
  width: 80px;
  height: 80px;
  position: absolute;
  right: 0px;
  bottom: -20px;
  img {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    bottom: 0px;
  }
}
</style>
