import { formatDate, getFilters } from '@/utils/index';
import { Dialog } from 'element-ui';
// import draggable from 'popmotion-draggable';
import { listen, styler, pointer, value } from 'popmotion';

const DragDialog = {
  name: 'drag-dialog',
  extends: Dialog,
  watch: {
    visible(newVal) {
      if (newVal) {
        const dialogStyler = styler(this.$refs.dialog);
        const dialogXY = value({x:0,y:0}, dialogStyler.set);
        let elHeader = this.$refs.dialog.querySelector('.el-dialog__header');
        listen(elHeader, 'mousedown touchstart').start(e => {
          e.preventDefault();
          pointer(dialogXY.get()).start(dialogXY);
          // console.log(x,y)
        });
        listen(document, 'mouseup touchend').start(() => {
          dialogXY.stop();
        });
      }
    },
  },
};
const extendVue = Vue => {
  Vue.prototype.$formatDate = formatDate;
  Vue.prototype.$getFilters = getFilters;
  
  Vue.component(DragDialog.name, DragDialog);
};

export default extendVue;
