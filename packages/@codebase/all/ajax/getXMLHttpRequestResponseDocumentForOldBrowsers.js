/* eslint-disable no-unused-vars */
// Note: This solution is very expensive for the interpreter. Use it only when it is really necessary.
function getHTML(oXHR, sTargetId) {
  var rOpen = new RegExp(
      "<(?!!)\\s*([^\\s>]+)[^>]*\\s+id\\=[\"']" + sTargetId + "[\"'][^>]*>",
      "i"
    ),
    sSrc = oXHR.responseText,
    aExec = rOpen.exec(sSrc);

  return aExec
    ? new RegExp(
        "(?:(?:.(?!<\\s*" +
          aExec[1] +
          "[^>]*[>]))*.?<\\s*" +
          aExec[1] +
          "[^>]*[>](?:.(?!<\\s*/\\s*" +
          aExec[1] +
          "\\s*>))*.?<\\s*/\\s*" +
          aExec[1] +
          "\\s*>)*(?:.(?!<\\s*/\\s*" +
          aExec[1] +
          "\\s*>))*.?",
        "i"
      ).exec(sSrc.slice(sSrc.indexOf(aExec[0]) + aExec[0].length)) || ""
    : "";
}

// var oReq = new XMLHttpRequest();
// oReq.open("GET", "yourPage.html", true);
// oReq.onload = function () { console.log(getHTML(this, "intro")); };
// oReq.send(null);
