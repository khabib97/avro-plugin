let checkBox = $("#on_off");
let keyState;

var timeoutId;
let textArea = $("#emergency_input");

var onTheButton = function() {
  checkBox.prop("checked", true);
};

var offTheButton = function() {
  checkBox.prop("checked", false);
};

var switchLanguage = function(isON) {
  $("textarea, input").avro({
    bangla: isON
  });
};

var buttonSwitcher = function(isON) {
  if (isON) {
    onTheButton();
  } else {
    offTheButton();
  }
};

var iconSwither = function(isON){
    if(isON){
        chrome.browserAction.setIcon({path: "img/avro.png"});
    }else{
        chrome.browserAction.setIcon({path: "img/avro_disable.png"});
    }
}

textArea.on("input propertychange change", function() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(function() {
    saveToDB(textArea.val());
  }, 1000);
});

var saveToDB = function(textMsg) {
  chrome.storage.sync.set({ msg: textMsg }, function() {});
};

var _action = function(keyState) {
  buttonSwitcher(keyState);
  switchLanguage(keyState);
  iconSwither(keyState);
  chrome.storage.sync.set(
    {
      isON: keyState
    },
    function() {}
  );
};

checkBox.change(function() {
  chrome.storage.sync.get("isON", function(data) {
    keyState = !data.isON;
    _action(keyState);
    location.reload(true);
  });
});

window.onload = function() {
  chrome.storage.sync.get("isON", function(data) {
    if (data.isON === undefined) {
      keyState = false;
    } else {
      keyState = data.isON;
    }
    _action(keyState);
    console.log("keyState:" + keyState);
  });

  chrome.storage.sync.get("msg", function(data) {
    if (data.msg !== undefined) {
      textArea.val(data.msg);
    }
  });
};
