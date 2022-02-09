<template>
  <div id="app">
    <component-message-adapter>
      <banner
        :obj="{
          src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }"
      />
      <form
        :obj="{
          btnText: '提交instance',
        }"
      />
    </component-message-adapter>
  </div>
</template>

<script>
import ComponentMessageAdapter from "./common/component-message-adapter";
import Banner from "./components/banner/index";
import Form from "./components/form/index";
import { getCampaignInfo } from "./api";

export default {
  name: "App",
  components: {
    Banner,
    Form,
    ComponentMessageAdapter,
  },
  mounted() {
    getCampaignInfo().then((res) => {
      console.log(res);
    });
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
img {
  vertical-align: top;
}
</style>
