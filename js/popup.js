
$(function(){
  chrome.windows.getAll(function(cwins){
    var tabs = 0, wins = 0;
    wins = cwins.length;
    for (var i=0; i<wins; i++) {
      var queryinfo = new Object();
      queryinfo["windowId"] = cwins[i].id;
      chrome.tabs.query(queryinfo, function(ctabs){
        tabs += ctabs.length;
        $(".message > .tab").text(tabs);
      });
    }
    $(".message > .window").text(wins);
  });
});


$(function(){
  var tabs = new Array();
  chrome.windows.getAll(function(cwins){
    for (var i=0; i<cwins.length; i++) {
      var queryinfo = new Object();
      queryinfo["windowId"] = cwins[i].id;
      chrome.tabs.query(queryinfo, function(ctabs){
        for (var j=0; j<ctabs.length; j++) {
          var tab = new Object(); 
          tab["url"] = ctabs[j].url;
          tab["title"] = ctabs[j].title;
          tab["pinned"] = ctabs[j].pinned;
          tab["incognito"] = ctabs[j].incognito;
          tab["window"] = ctabs[j].windowId;
          tabs.push(tab);
        }
      });
    }
  });

  // create json request and post to server
  $("#submit_btn").click(function(){
    var content = new Object();
    content["pool"] = $("#panel-pool").val();
    content["snapshot"] = tabs;
    $.post("http://localhost:4567/pools",JSON.stringify(content));
    alert("サーバに送信しました");
  });
});


