function restore(links) {
  var i = 0;
  console.log(links); //debug
  chrome.windows.create({"incognito":links[i]["incognito"],"url":links[i]["url"]}, function(cw) {
    chrome.tabs.update(cw.tabs[0].id,{"pinned":links[i]["pinned"]});
    i++;
    for (;i<links.length; i++) {
      chrome.tabs.create({"url":links[i]["url"],"pinned":links[i]["pinned"],"windowId":cw.id});
    }
  });
}

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  var req = message["request"];
  var req_len = req.length;
  var max_w_id = req[req_len-1]["window"];
  for (var w_id=0, i=0; w_id<=max_w_id; w_id++) {
    var links = new Array();
    console.log("i:"+i+" w_id:"+w_id+" req:"+req[i]["window"]+" max:"+max_w_id); //debug
    while (i<req_len && req[i]["window"]==w_id) {
      console.log(" loop i:"+i+" w_id:"+w_id); //debug
      links.push(req[i]);
      i++;
    }
    restore(links);
  }
});
