<template>
  <div class="image-uploader">
    <div v-if="done" @mouseover="toogleDelIcon" @mouseout="toogleDelIcon" class="image-uploader-done">
      <div v-if="showDel && canDelete" class="mask">
        <svg @click="delImg" class="delimg icon">
          <use xlink:href="#icon-delimg"></use>
        </svg>
      </div>
      <img class="image-uploader-img" :src="url" />
      <!-- <img class="del" src="@/assets/images/icon_delete.png" @click="delImg" /> -->
    </div>
    <label v-else class="image-uploader-pre">
      <slot>
        <svg class="icon image-uploader-icon" aria-hidden="true">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </slot>
      <input ref='input' type="file" accept='image/*' @change="uploadImg" style="display: none;" />
    </label>
  </div>
</template>

<style lang="scss" scoped>
.image-uploader {
  width: 123px;
  height: 123px;
  border: 1px solid #ccc;
  .mask {
    position: absolute;
    z-index: 20;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .image-uploader-pre,
  .image-uploader-done {
    display: block;
    position: relative;
    height: 100%;
    .delimg {
      width: 50px;
      height: 50px;
      position: absolute;
      left: 50%;
      top: 50%;
      font-size: 50px;
      fill: #999;
      margin-left: -25px;
      margin-top: -25px;
      fill: #fff;
    }
    .image-uploader-img {
      width: 100%;
    }
  }
  .image-uploader-icon {
    position: absolute;
    display: block;
    width: 50px;
    height: 50px;
    font-size: 50px;
    left: 50%;
    top: 50%;
    margin-top: -25px;
    margin-left: -25px;
    fill: #999;
  }
}
</style>

<script>
import * as qiniu from 'qiniu-js';
import { getDelImgToken } from '@/api/mall/common';
import { mapGetters } from 'vuex';

export default {
  name: 'image-uploader',
  data() {
    return {
      file: null,
      fileName: '',
      url: '',
      domain: 'http://qiniu.dcrym.com/',
      showDel: false,
    };
  },
  props: {
    value: {
      // 图片地址
      type: String,
      default: '',
    },
    canDelete: {
      // 是否显示删除按钮
      type: Boolean,
      default: true,
    },
    option: {
      // 剪裁比例大小
      type: Object,
      default: () => ({
        CropBox: {
          width: 200,
          height: 100,
        },
      }),
    },
  },
  created() {
    this.getImgToken();
    this.setUrl(this.value);
  },
  computed: {
    ...mapGetters(['getToken', 'userInfo']),
    done() {
      return this.value ? true : false;
    },
  },
  watch: {
    value(newVal) {
      this.setUrl(newVal);
    },
  },
  deactivated() {
    this.refreshData();
  },
  methods: {
    setUrl(val) {
      this.url = val ? val : '';
      this.fileName = val ? val.replace(this.domain, '') : '';
    },
    toogleDelIcon() {
      this.showDel = !this.showDel;
    },
    getImgToken(isReload) {
      if (isReload) {
        return this.$store.dispatch('getUploadImgToken').then(res => {
          this.uploadImg(null, this.file);
          return;
        });
      }
      if (window.hasToken) return;
      window.hasToken = true;
      this.$store.dispatch('getUploadImgToken');
    },
    refreshData() {
      this.file = null;
      this.fileName = '';
      this.url = '';
      if (this.$refs.input && this.$refs.input.value) {
        this.$refs.input.value = '';
      }
    },
    uploadImg(e, blob) {
      let file = blob ? blob : this.$refs.input.files[0];
      this.file = file;
      const id = this.userInfo.id;
      const timeStemp = new Date().getTime();
      let key = id + timeStemp;

      let putExtra = {
        fname: '',
        params: {},
        mimeType: null,
      };
      let config = {
        useCdnDomain: true,
        region: qiniu.region.z2,
      };
      // 调用sdk上传接口获得相应的observable，控制上传和暂停
      let observable = qiniu.upload(file, key, this.getToken, putExtra, config);
      observable.subscribe({
        next: this._next,
        error: this._error,
        complete: this._complete,
      });
    },
    delImg() {
      getDelImgToken({
        fileName: this.fileName,
      })
        .then(res => {
          if (res.code === '0') {
            this.$emit('input', '');
            this.$nextTick(() => {
              if (this.$refs.input) this.$refs.input.value = '';
            });
          } else {
            console.log('删除错误：' + res.msg);
            this.$message.error('删除错误!');
          }
        })
        .catch(err => {
          console.log('删除错误：' + err.msg);
        });
    },
    _error(err) {
      if (err.isRequestError && err.code == '401') {
        this.getImgToken(true);
      } else {
        console.log(err);
        this.$refs.input.value = '';
      }
    },
    _next(res) {
      // total: {
      //  loaded: number，已上传大小，单位为字节。
      //  total: number，本次上传的总量控制信息，单位为字节。
      //  percent: number，当前上传进度，范围：0～100。
      // }
      console.log(res.total.percent);
    },
    _complete(response) {
      console.log(response);
      this.$emit('input', this.domain + response.key);
      this.fileName = response.key;
    },
  },
};
</script>
