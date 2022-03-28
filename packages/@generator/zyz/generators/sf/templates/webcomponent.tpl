class <%= className %> extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});

    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');
    const info = document.createElement('span');
    info.setAttribute('class', 'info');
    const text = this.getAttribute('data-text');
    info.textContent = text;
    wrapper.appendChild(info);
    shadow.appendChild(wrapper);

    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');
    console.log(style.isConnected);
    style.textContent = `
      .wrapper {
        position: relative;
      }
    `;
    shadow.appendChild(style);
    
    // 请注意， 因为<link> 元素不会打断 shadow root 的绘制, 因此在加载样式表时可能会出现未添加样式内容（FOUC），导致闪烁。
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', 'style.css');
    shadow.appendChild(linkElem);
  }
}

customElements.define('<%= fileName %>', <%= className %>);