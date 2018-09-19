<template>
  <div class="editor-wrapper" ref="editor" style="text-align:left;margin-top: 20px;"></div>
</template>

<script>
import E from 'wangeditor';
import * as qiniu from 'qiniu-js';
import config from '@/config/index';
import { getUploadImgToken, getDelImgToken } from '@/api/mall/common';

export default {
  name: 'editor',
  props: {
    onchange: Function,
    config: Object,
  },
  data() {
    return {
      IMG_URL: config.IMG_URL,
      editor: null,
    };
  },
  methods: {
    getImgToken(isReload) {
      if (isReload) {
        getUploadImgToken().then(res => {
          console.log(res);
          window.$imageToken = res.data;
          this.uploadImg();
        });
        return;
      }
      if (window.hasToken) return;
      window.hasToken = true;
      getUploadImgToken().then(res => {
        window.$imageToken = res.data;
      });
    },
    uploadImg(files, insert) {
      console.log(files);
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      let file = files[0];
      let key = null;
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
      let observable = qiniu.upload(
        file,
        key,
        window.$imageToken,
        putExtra,
        config
      );
      // 上传代码返回结果之后，将图片插入到编辑器中
      let complete = response => {
        insert(this.IMG_URL + response.key);
      };
      let _error = err => {
        console.log(err);
        if (err.isRequestError && err.code == 401) {
          this.getImgToken(true);
        } else {
          console.log(err);
          this.$refs.input.value = '';
        }
      };
      let _next = res => {
        // total: {
        //  loaded: number，已上传大小，单位为字节。
        //  total: number，本次上传的总量控制信息，单位为字节。
        //  percent: number，当前上传进度，范围：0～100。
        // }
        console.log(res.total.percent);
      };
      observable.subscribe({
        next: this._next,
        error: _error,
        complete,
      });
    },
  },
  mounted() {
    this.editor = new E(this.$refs.editor);
    this.editor.customConfig = {
      menus: [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        // 'link', // 插入链接
        // 'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        // 'emoticon', // 表情
        'image', // 插入图片
        // 'table', // 表格
        // 'video', // 插入视频
        // 'code', // 插入代码
        'undo', // 撤销
        'redo', // 重复
      ],
      customUploadImg: this.uploadImg,
      onchange: this.onchange,
      zIndex: 300,
      ...this.config,
    };
    this.editor.create();
  },
};
</script>

<style>
.editor-wrapper {
  width: 80%;
}
.editor-wrapper img {
  width: auto;
}
</style>
