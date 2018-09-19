<template>
  <div class="tab-container">
    homePage
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'tab',
  data() {
    return {
      dialogVisible: false,
      props: {
        label: 'campusName',
        value: 'id',
        children: 'children',
      },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: true,
        type: ['步步高'],
        resource: '小天才',
        desc: '',
      },
      index: 1,
      options: [],
    };
  },
  computed: {
    campusSelectList() {
      return this.campusList.map(item => ({
        label: item.campusName,
        value: item.id,
        children: [],
      }));
    },
    cabinetSelectList() {
      return this.cabinetList.map(item => ({
        label: item.cabinetLocation,
        value: item.cabinetId,
        children: [],
      }));
    },
    latticeSelectList() {
      return this.latticeList.map(item => ({
        label: item.location,
        value: item.id,
      }));
    },
  },

  methods: {
    showDialog() {
      console.log('show');
      this.dialogVisible = true;
    },
    ...mapActions('listData1', ['updatePagination']),
    getChange(val) {
      console.log(val);
    },
    handleChange(val) {
      if (val.length === 1) {
        let campusValue = val[0];
        console.log(campusValue);
        this.$store
          .dispatch('fetchCabinetList', { campusId: campusValue })
          .then(res => {
            this.campusSelectList.find(
              item => item.value == campusValue
            ).children = this.cabinetSelectList;
          });
      } else if (val.length === 2) {
        let campusValue = val[0];
        let cabinetValue = val[1];
        this.$store
          .dispatch('fetchLatticeList', {
            campusId: campusValue,
            cabinetId: cabinetValue,
          })
          .then(res => {
            this.cabinetSelectList.find(
              item => item.value == cabinetValue
            ).children = this.latticeSelectList;
          });
      }
    },
    onSubmit() {
      this.$message.success('提交成功！');
    },
    add() {
      this.index += 1;
      this.$store.dispatch('listData1/updatePagination', {
        pageNum: this.index,
      });
      // this.updatePagination({pageNum: this.index})
    },
    getCompus() {
      this.$store.dispatch('fetchCampusList');
    },
    ret() {
      this.$store.dispatch('resetLatticeCabinet');
    },
  },
};
</script>

<style>
.line {
  text-align: center;
}
.tab-container {
  margin: 30px;
}
.from-box {
  width: 800px;
}
</style>
