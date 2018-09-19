<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
p,
ul,
li {
  margin: 0;
  padding: 0;
}
ul,
dl {
  list-style: none;
}
#app .main-wrap {
  margin: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px #ccc;
  .search-bar {
    display: flex;
    padding: 20px 15px 0;
  }

  .grid-content {
    margin-right: 20px;
  }
  .tabel-wrap {
    padding: 15px;
  }
  .custom-tree-node {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
}
.el-table .cell {
  box-sizing: border-box;
  white-space: nowrap;
  word-break: break-all;
  line-height: 23px;
}
.el-table td,
.el-table th {
  padding: 6px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
}
.el-table .cell {
  box-sizing: border-box;
  white-space: nowrap;
  word-break: break-all;
  line-height: 15px;
}
.el-table .el-table__row {
  height: 43px;
}
.el-dialog__header {
  border-bottom: 1px solid #ccc;
}
.el-dialog {
  min-width: 635px;
}
.table-footer {
  display: flex;
  justify-content: space-between;
  margin: 30px 30px 0;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type='number'] {
  -webkit-appearance: none;
  -moz-appearance: textfield;
}
</style>
<script>
export default {
  name: 'App',
};
</script>
