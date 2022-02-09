<template>
  <div>
    <Demo
      :schemaProps="schema"
      :formDataProps="formData"
    />
  </div>
</template>

<script>
import {reactive, toRefs} from 'vue';
import Demo from './demo';

export default {
  name: 'App',
  setup() {
    const state = reactive({
      "schema": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "title": "名称"
          },
          "configs": {
            "title": "对象",
            "type": "object",
            "properties": {
              "name": {
                "type": "string",
                "title": "string"
              },
              "array": {
                "type": "array",
                "title": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "input1": {
                      "title": "简单输入框",
                      "type": "string"
                    },
                    "selet1": {
                      "title": "单选",
                      "type": "string",
                      "enum": [
                        "a",
                        "b",
                        "c"
                      ],
                      "enumNames": [
                        "早",
                        "中",
                        "晚"
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      },
      formData: {

      },
    });

    return {
      ...toRefs(state),
    }
  },
  components: {
    Demo,
  }
}
</script>
