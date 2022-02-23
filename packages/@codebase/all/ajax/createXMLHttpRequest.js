/* eslint-disable no-unused-vars */
//var xmlHttpRequest=createXMLHttpRequest();
function createXMLHttpRequest() {
  var xhr = null;

  if (window.ActiveXObject) {
    var versions = [
      "Microsoft.XMLHTTP",
      "MSXML6.XMLHTTP",
      "MSXML5.XMLHTTP",
      "MSXML4.XMLHTTP",
      "MSXML3.XMLHTTP",
      "MSXML2.XMLHTTP",
      "MSXML.XMLHTTP",
    ];

    for (var i = 0; i < versions.length; i++) {
      try {
        // eslint-disable-next-line no-undef
        xhr = new ActiveXObject(versions[i]);
        break;
      } catch (ex) {
        continue;
      }
    }
  } else {
    xhr = new XMLHttpRequest();
  }
  return xhr;
}
