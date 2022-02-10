<template>
  <h2 class="green ctr">welcome {{username}}</h2>
</template>

<script>
export default {
  data: function() {
    return {
      welcome: "sweet"
    };
  },
  computed: {
    username: function() {
      return this.$route.params.username;
    }
  },
  methods: {
    goBack: function() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
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