$(function(){
  chrome.storage.sync.get(function(storage){
    $("#server").val(storage["server"]);
    $("#pools").val(storage["pools"]);
  });
});

$(function(){
  $("#submit_btn").click(function(){
    var storage = new Object();
    storage["server"] = $("#server").val();
    storage["pools"] = $("#pools").val();
    chrome.storage.sync.set(storage, function(){
      chrome.notifications.create({
          "type": "basic",
          "iconUrl": "icon/icon.png",
          "title":"mi2428.link",
          "message":"設定を保存しました"
      });
    });
  });
});
