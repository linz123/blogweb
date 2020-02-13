!function (e, t) {
  function a() {
    var e = n.clientWidth, t = n.clientHeight;
    750 <= e && (e = 750), e && (n.style.fontSize = e / 750 * 100 * (.56 / (e / t)) + "px")
  }

  var n = e.documentElement, o = "orientationchange" in window ? "orientationchange" : "resize";
  e.addEventListener && (t.addEventListener(o, a, !1), e.addEventListener("DOMContentLoaded", a, !1))
}(document, window);
var ys = {
  name: "威尼斯人",
  site: "v27",
  xurl: "https://ondhv.com/",
  mobileconfig: "https://bw8x.com/media.mobileconfig",
  uidUrl: "https://ck8x.com/UDID/plistPath",
  shareKey: "2KBKEH6KEBFE26",
  overInstall: "v27.app2.xin",
  system: "android",
  item: null,
  url: {web: "https://v27c.com", cdn: "https://images.polarbearchem.com/"}
}, xdata = ShareInstall.parseUrlParams(), xObj = null;

function getJson(e, t) {
  $.get(ys.xurl + "wg" + e + "/update/" + ys.site + ".json?" + Date.now(), function (e) {
    myLoad(1), e && (myLoad(), t(e))
  })
}

function getData() {
  getJson("app", function (e) {
    ys.item = e[ys.system], "ios" != ys.system || ys.item.open || $("#downBtn").text("IOS版维护中，请暂时先用安卓版或H5").addClass("dis")
  }), getJson("api", function (e) {
    ys.url = e[0]
  })
}

function goHome() {
  location.href = ys.url.web + (/^(\w|\d){6}$/.test(xdata.agent) ? "/#/register?parent=" + xdata.agent : /^(\w|\d){6}$/.test(xdata.channel) ? "/#/?rst=" + xdata.channel : "")
}

function down() {
  switch (ys.system) {
    case"ios":
      ys.item && ys.item.open ? (myLoad(1), window.location.href = ys.mobileconfig) : confirm("非常抱歉，" + ys.name + "苹果版APP正在升级维护中，请暂时使用安卓版或者H5版，谢谢。\n\n 点确定将跳转到H5版") && goHome();
      break;
    case"android":
      xObj ? xObj.wakeupOrInstall() : ys.item && ys.item.url ? (myLoad(1), location.href = ys.item.url) : getData()
  }
}

function myLoad(e) {
  e ? ($(".loader").addClass("show"), setTimeout(function () {
    myLoad()
  }, 5e3)) : $(".loader").removeClass("show")
}

if ($(function () {
  var e = navigator.userAgent;
  "micromessenger" == e.toLowerCase().match(/MicroMessenger/i) && $(".wx_pop").removeClass("hide"), /(iPhone|iPad|iPod|iOS)/i.test(e) ? (xdata.agent ? goHome() : location.href = "ios.html", $("body").addClass((ys.overInstall, "over")).addClass("show_guide"), ys.overInstall && ($("#downBtn").hide(), $("#overBtn").show(), $("#overInstall").attr("src", "js/ios_install.js"), setTimeout(function () {
    new DowloadBtnPlugin({el: "#overBtn", downloadFixed: !0, appDomain: ys.overInstall, clickRun: !0})
  }, 2e3)), (!/Safari/.test(e) || /Chrome/.test(e) || /baidubrowser/.test(e) || /Firefox/.test(e) || /MQQBrowser/.test(e) || /CriOS/.test(e)) && $("#overBtn").text("请在Safari中打开本页进行安装")) : /(Android)/i.test(e) && (xdata.agent || xdata.channel) && (xdata.agent && localStorage.setItem(ys.site + "_agent", xdata.agent), xdata.channel && localStorage.setItem(ys.site + "_channel", xdata.channel), new ShareInstall({
    appKey: ys.shareKey,
    weChatdownload: !0,
    onready: function () {
      xObj = this, $("body").addClass("show_xbtn")
    }
  }, xdata)), getData();
  var t = new QRCode(document.getElementsByClassName("box")[0], {width: 300, height: 300});
  setTimeout(function () {
    myLoad(), $("body").addClass("show"), t.makeCode(location.href)
  }, 500)
}), xdata.UDID) {
  myLoad(1);
  var agent_code = localStorage.getItem(ys.site + "_agent"), channel_code = localStorage.getItem(ys.site + "_channel"),
    urls = ys.uidUrl + "?udid=" + xdata.UDID + (/^(\w|\d){6}$/.test(agent_code) ? "&agent=" + agent_code : /^(\w|\d){6}$/.test(channel_code) ? "&channel=" + channel_code : ""),
    totalCount = 0;

  function getUdId() {
    if (5 <= totalCount) return clearInterval(timer), myLoad(), void localStorage.clear();
    $.get(urls, function (e) {
      if (totalCount++, e && 0 < e.length) return myLoad(), localStorage.clear(), clearInterval(timer), window.location.href = "itms-services://?action=download-manifest&url=" + e
    })
  }

  var timer = setInterval(function () {
    getUdId()
  }, 5e3)
}
