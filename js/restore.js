$(function(){
  var snapshot_id = ".snapshot-" + $(".snapshot-container").attr("id");
  var request = new Array();

  $(snapshot_id).each(function(){
    var snapshot = new Object();
    snapshot["pinned"] = false;
    snapshot["incognito"] = false;
    snapshot["url"] = "";
    snapshot["window"] = 0;
    $(this).children("p").each(function(){
      if ($(this).hasClass("snapshot-link-pinned") && ($(this).text() == "T")) snapshot["pinned"] = true;
      if ($(this).hasClass("snapshot-link-incognito") && ($(this).text() == "T")) snapshot["incognito"] = true;
      if ($(this).hasClass("snapshot-link-window")) snapshot["window"] = $(this).text();
      if ($(this).hasClass("snapshot-link-url")) snapshot["url"] = $(this).text()
    });
    request.push(snapshot);
  });

  chrome.runtime.sendMessage({request: request});
});
