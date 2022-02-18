<template>
  <div>
    <p v-once :class="$style.text">这个将不会改变: {{ message }}</p>
    <p :title="messageTitle">{{ reversedMessageComputed }}</p>
    <a :[attributeName]="url">动态bind attributeName</a>
    <p>{{ rawHtml }}</p>
    <p v-html="rawHtml"></p>
    <button @click="reverseMessage">反转消息</button>
    <button @click="reverseMessage">反转消息缩写</button>
    <button @[eventName]="reverseMessage">动态bind eventName</button>
    <form @submit.prevent="onSubmit">submit</form>
    <p>Ask a yes/no question: <input v-model="question" /></p>
    <p>{{ answer }}</p>
    <div class="static" :class="{ active: isActive, 'text-danger': hasError }"></div>
    <div :class="classObject"></div>
    <div :class="[activeClass, errorClass]"></div>
    <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
    <div :style="styleObject"></div>
    <p v-if="seen">现在你看到我了</p>
    <h1 v-else>Oh no 😢</h1>
    <template v-if="seen">
      <h1>Title</h1>
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
    </template>
    <div v-if="type === 'A'">A</div>
    <div v-else-if="type === 'B'">B</div>
    <div v-else-if="type === 'C'">C</div>
    <div v-else>Not A/B/C</div>
    <template v-if="loginType === 'username'">
      <label>Username</label>
      <input key="username-input" placeholder="Enter your username" />
    </template>
    <template v-else>
      <label>Email</label>
      <input key="email-input" placeholder="Enter your email address" />
    </template>
    <!-- v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS property display。
    注意，v-show 不支持 <template> 元素，也不支持 v-else。 -->
    <h4 v-show="seen">Hello!</h4>
    <ol>
      <li v-for="(todo, index) in todos" :key="todo.text">{{ index }}-{{ todo.text }}</li>
    </ol>
    <ol>
      <LiItem v-for="item of groceryList" :key="item.id" :todo="item"></LiItem>
    </ol>
    <ul id="v-for-object" class="demo">
      <li v-for="(value, name, index) in object" :key="name">{{ index }}. {{ name }}: {{ value }}</li>
    </ul>
    <ul>
      <li v-for="n in evenNumbers" :key="n">{{ n }}</li>
    </ul>
    <!-- Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：
    push()
    pop()
    shift()
    unshift()
    splice()
    sort()
    reverse() -->
    <ul v-for="(set, index) in sets" :key="index">
      <li v-for="(n, i) in even(set)" :key="i">{{ n }}</li>
    </ul>
    <div>
      <span v-for="(n, i) in 10" :key="i">{{ n }} </span>
    </div>
    <ul>
      <template v-for="(item, index) in todos">
        <li :key="item.text">{{ item.text }}</li>
        <li :key="index" class="divider" role="presentation">------</li>
      </template>
    </ul>
    <!-- 不推荐在同一元素上使用 v-if 和 v-for
    当它们处于同一节点，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。 -->
    <div>
      <p>The button above has been clicked {{ counter }} times.</p>
      <button @click="counter += 1">Add 1</button>
      <button @click="greet">Greet</button>
      <button @click="say('hi')">Say hi</button>
      <button @click="say('what')">Say what</button>
      <button @click="warn('Form cannot be submitted yet.', $event)">Submit</button>
      <!-- 在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。 -->
      <!-- 为了解决这个问题，Vue.js 为 v-on 提供了事件修饰符。之前提过，修饰符是由点开头的指令后缀来表示的。-->
      <!-- 阻止单击事件继续传播 -->
      <a @click.stop="doThis"></a>
      <!-- 提交事件不再重载页面 -->
      <form @submit.prevent="onSubmit"></form>
      <!-- 修饰符可以串联 -->
      <a @click.stop.prevent="doThat"></a>
      <!-- 只有修饰符 -->
      <form @submit.prevent></form>
      <!-- 添加事件监听器时使用事件捕获模式 -->
      <!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
      <div @click.capture="doThis"></div>
      <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
      <!-- 即事件不是从内部元素触发的 -->
      <div @click.self="doThat"></div>
      <!-- 点击事件将只会触发一次 -->
      <a @click.once="doThis"></a>
      <!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
      <!-- 而不会等待 `onScroll` 完成  -->
      <!-- 这其中包含 `event.preventDefault()` 的情况 -->
      <div @scroll.passive="onScroll">...</div>
      <!-- 不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，.passive 会告诉浏览器你不想阻止事件的默认行为。 -->
      <!-- 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 v-on:click.prevent.self 会阻止所有的点击，而 v-on:click.self.prevent 只会阻止对元素自身的点击。 -->
      <!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
      <input @keyup.enter="submit" />
      <input @keyup.page-down="onPageDown" />
      <!-- 为了在必要的情况下支持旧浏览器，Vue 提供了绝大多数常用的按键码的别名：
        .enter
        .tab
        .delete (捕获“删除”和“退格”键)
        .esc
        .space
        .up
        .down
        .left
        .right -->
      <!-- <input @keyup.13="submit" /> -->
      <!-- keyCode 的事件用法已经被废弃了并可能不会被最新的浏览器支持。 -->
      <!-- 你还可以通过全局 config.keyCodes 对象自定义按键修饰符别名：
      // 可以使用 `v-on:keyup.f1`
      Vue.config.keyCodes.f1 = 112 -->

      <!-- 可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。
        .ctrl
        .alt
        .shift
        .meta -->
      <!-- 请注意修饰键与常规按键不同，在和 keyup 事件一起用时，事件触发时修饰键必须处于按下状态。
      换句话说，只有在按住 ctrl 的情况下释放其它按键，才能触发 keyup.ctrl。而单单释放 ctrl 也不会触发事件。如果你想要这样的行为，请为 ctrl 换用 keyCode：keyup.17。 -->

      <!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
      <button @click.ctrl="onClick">A</button>
      <!-- 有且只有 Ctrl 被按下的时候才触发 -->
      <button @click.ctrl.exact="onCtrlClick">A</button>
      <!-- 没有任何系统修饰符被按下的时候才触发 -->
      <button @click.exact="onClick">A</button>

      <!-- 鼠标按钮修饰符
        .left
        .right
        .middle -->

      <!-- v-model 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：
        text 和 textarea 元素使用 value property 和 input 事件；
        checkbox 和 radio 使用 checked property 和 change 事件；
        select 字段将 value 作为 prop 并将 change 作为事件。 -->

      <hr />
      <input v-model="msg" placeholder="edit me" />
      <p>Message is: {{ msg }}</p>

      <p>Multiline message is:</p>
      <p style="white-space: pre-line">{{ msg }}</p>
      <textarea v-model="msg" placeholder="add multiple lines"></textarea>
      <br />

      <input id="checkbox" v-model="checked" type="checkbox" />
      <label for="checkbox">{{ checked }}</label>
      <br />

      <input id="jack" v-model="checkedNames" type="checkbox" value="Jack" />
      <label for="jack">Jack</label>
      <input id="john" v-model="checkedNames" type="checkbox" value="John" />
      <label for="john">John</label>
      <input id="mike" v-model="checkedNames" type="checkbox" value="Mike" />
      <label for="mike">Mike</label>
      <br />
      <span>Checked names: {{ checkedNames }}</span>

      <div>
        <input id="one" v-model="picked" type="radio" value="One" />
        <label for="one">One</label>
        <br />
        <input id="two" v-model="picked" type="radio" value="Two" />
        <label for="two">Two</label>
        <br />
        <span>Picked: {{ picked }}</span>
      </div>
    </div>

    <div>
      <select v-model="selected">
        <option disabled value="">请选择</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <span>Selected: {{ selected }}</span>
    </div>
    <!-- 如果 v-model 表达式的初始值未能匹配任何选项，<select> 元素将被渲染为“未选中”状态。
      在 iOS 中，这会使用户无法选择第一个选项。因为这样的情况下，iOS 不会触发 change 事件。因此，更推荐像上面这样提供一个值为空的禁用选项。 -->

    <div>
      <select v-model="selected2" multiple style="width: 50px">
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
      <br />
      <span>Selected: {{ selected2 }}</span>
    </div>

    <!-- 当选中时，`picked` 为字符串 "a" -->
    <input v-model="picked" type="radio" value="a" />
    <!-- `toggle` 为 true 或 false -->
    <input v-model="toggle" type="checkbox" />
    <!-- 当选中第一个选项时，`selected` 为字符串 "abc" -->
    <select v-model="selected">
      <option value="abc">ABC</option>
    </select>

    <input v-model="toggle" type="checkbox" true-value="yes" false-value="no" />
    <input v-model="pick" type="radio" :value="a" />
    <select v-model="selected">
      <!-- 内联对象字面量 -->
      <option :value="{ number: 123 }">123</option>
    </select>

    <!-- 在“change”时而非“input”时更新 -->
    <input v-model.lazy="msg" />
    <!-- 自动将用户的输入值转为数值类型 -->
    <input v-model.number="age" type="number" />
    <input v-model.trim="msg" />

    <base-checkbox v-model="lovingVue" @change="log"></base-checkbox>

    <!-- <base-input> 组件根元素实际上是一个 <label> 元素,所以.native失效 -->
    <!-- <base-input @focus.native="onFocus"></base-input> -->
    <base-input @focus="onFocus"></base-input>

    <!-- <text-document :title.sync="doc.title"></text-document> -->

    <base-layout>
      <!-- 任何没有被包裹在带有 v-slot 的 <template> 中的内容都会被视为默认插槽的内容。 -->
      <template #header>
        <h1>Here might be a page title</h1>
      </template>

      <template #default>
        <p>A paragraph for the main content.</p>
        <p>And another one.</p>
      </template>

      <template #footer>
        <p>Here's some contact info</p>
      </template>
    </base-layout>

    <todo-list :todos="todos">
      <template #todo="{ todo }">
        <span v-if="todo.isComplete">✓</span>
        {{ todo.text }}
      </template>
    </todo-list>

    <load-component :component="todoComponent"></load-component>

    <animate-transition />

    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/fullpage"> Go to Full Page </router-link>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import _ from "lodash";

import todoComponent from "./components/todo/todo.vue";
import TodoList from "./components/todoSlot/TodoList.vue";
import LoadComponent from "./components/LoadComponent/LoadComponent.vue";
import AnimateTransition from "./components/AnimateTransition/AnimateTransition.vue";

export default Vue.extend({
  // 局部注册
  // 局部注册的组件在其子组件中不可用
  components: {
    TodoList,
    LoadComponent,
    AnimateTransition,
  },
  data: function () {
    return {
      message: "鼠标悬停几秒钟查看此处动态绑定的提示信息！",
      messageTitle: "页面加载于 " + new Date().toLocaleString(),
      seen: true,
      type: "B",
      rawHtml: "<span style='color:red'>This should be red</span>",

      todoComponent: todoComponent,
      todos: [
        { id: 1, text: "学习 JavaScript", isComplete: true },
        { id: 2, text: "学习 Vue" },
        { id: 3, text: "整个牛项目" },
      ],
      groceryList: [
        { id: 0, text: "蔬菜" },
        { id: 1, text: "奶酪" },
        { id: 2, text: "随便其它什么人吃的东西" },
      ],
      object: {
        title: "How to do lists in Vue",
        author: "Jane Doe",
        publishedAt: "2016-04-10",
      },
      numbers: [1, 2, 3, 4, 5],
      sets: [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
      ],

      attributeName: "href",
      url: "https://www.baidu.com",
      eventName: "click",

      firstName: "Foo",
      lastName: "Bar",
      // fullName: 'Foo Bar',

      question: "",
      answer: "I cannot give you an answer until you ask a question!",

      isActive: true,
      hasError: false,
      classObject: {
        active: true,
        "text-danger": true,
      },
      activeClass: "active",
      errorClass: "text-danger",
      activeColor: "red",
      fontSize: 30,
      styleObject: {
        color: "red",
        fontSize: "13px",
      },

      loginType: "email",

      counter: 1,

      toggle: true,
      pick: true,
      a: "111",
      age: 16,
      msg: "",
      checked: true,
      checkedNames: [],
      picked: "",
      selected: "",
      selected2: [],

      lovingVue: true,
    };
  },
  // 计算属性是基于它们的响应式依赖进行缓存的
  // 这就意味着只要 message 还没有发生改变，多次访问 reversedMessageComputed 计算属性会立即返回之前的计算结果，而不必再次执行函数
  computed: {
    // 计算属性的 getter
    reversedMessageComputed: function () {
      // `this` 指向 vm 实例
      return this.message.split("").reverse().join("");
    },
    fullName: {
      // getter
      get: function () {
        return this.firstName + " " + this.lastName;
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(" ");
        this.firstName = names[0];
        this.lastName = names[names.length - 1];
      },
    },
    evenNumbers: function () {
      return this.numbers.filter(function (number) {
        return number % 2 === 0;
      });
    },
  },
  // 侦听属性
  // 当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。
  // 除了 watch 选项之外，还可以使用命令式的 vm.$watch API
  watch: {
    firstName: function (val) {
      this.fullName = val + " " + this.lastName;
    },
    lastName: function (val) {
      this.fullName = this.firstName + " " + val;
    },
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      console.log(newQuestion, oldQuestion);
      this.answer = "Waiting for you to stop typing...";
      this.debouncedGetAnswer();
    },
  },
  created: function () {
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500);
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split("").reverse().join("");
    },
    even: function (numbers) {
      return numbers.filter(function (number) {
        return number % 2 === 0;
      });
    },
    getAnswer: function () {
      if (this.question.indexOf("?") === -1) {
        this.answer = "Questions usually contain a question mark. ;-)";
        return;
      }
      this.answer = "Thinking...";
      var vm = this;
      axios
        .get("https://yesno.wtf/api")
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer);
        })
        .catch(function (error) {
          vm.answer = "Error! Could not reach the API. " + error;
        });
    },
    greet: function (event) {
      // `this` 在方法里指向当前 Vue 实例
      alert("Hello " + this.name + "!");
      // `event` 是原生 DOM 事件
      if (event) {
        alert(event.target.tagName);
      }
    },
    say: function (message) {
      alert(message);
    },
    warn: function (message, event) {
      // 现在我们可以访问原生事件对象
      if (event) {
        event.preventDefault();
      }
      alert(message);
    },
    log: function (msg) {
      console.log(msg);
    },
    onFocus: function ($event) {
      console.log("onFocus : ", $event);
    },
  },
});
</script>

<style module>
.text {
  color: var(--primary);
}
</style>
