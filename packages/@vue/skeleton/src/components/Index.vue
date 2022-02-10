<template>
    <div>
        <anchored-heading :level="2">anchored-heading</anchored-heading>
        <router-link to="/welcome">welcome</router-link>
        <router-link to="/example/魔力鸭">魔力鸭</router-link>
        <router-link to="/example/魔力鸭2333333">魔力鸭2333333</router-link>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      welcome: "sweet"
    };
  }
};
</script>

<style scoped>
.wrap {
  width: 300px;
  max-height: 200px;
  margin: auto;
  border: 1px solid #f7f8f8;
  border-radius: 10px;
  background-color: #f7f8f8;
  box-shadow: 1px 2px 0 3px #f7f8f8;
}
.ctr {
  text-align: center;
}
.green {
  color: green;
}
</style>