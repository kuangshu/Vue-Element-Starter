<template>
  <div class="mf-loading-container">
    <img src="../images/loading.gif">
  </div>
</template>
<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'loading'
  export default {
    name: COMPONENT_NAME
  }
</script>
<style lang="less">
  .mf-loading-container {
    img {
      width: 50px;
      height: 50px;
      display: block;
    }
  }
</style>