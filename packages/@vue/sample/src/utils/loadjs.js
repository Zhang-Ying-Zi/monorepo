function loadjs(src) {
  return new Promise((resolve, reject) => {
    // // 检查是否已存在相同的script
    // var scripts = document.getElementsByTagName("script");
    // console.log(scripts);
    // for (let i = scripts.length - 1; i >= 0; i--) {
    //   if (scripts[i].src == src) return resolve();
    // }

    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    document.body.appendChild(script);

    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      reject();
    };
  });
}

export default loadjs;
