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
  $("textarea, input").avro({ bangla: isON });
};

var buttonSwitcher = function(isON) {
  if (isON) {
    onTheButton();
  } else {
    offTheButton();
  }
};

var iconSwither = function(isON) {
  if (isON) {
    browser.browserAction.setIcon({ path: "img/avro.png" });
  } else {
    browser.browserAction.setIcon({ path: "img/avro_disable.png" });
  }
};

var action = function(keyState) {
  console.log("action 1: " + keyState);
  buttonSwitcher(keyState);
  switchLanguage(keyState);
  iconSwither(keyState);
  console.log("action 2: " + keyState);
  browser.storage.local.set({ isON: keyState });
};

var onError = function(error) {
  console.log(`Error Controller: ${error}`);
};

var saveToDB = function(textMsg) {
  browser.storage.local.set({ msg: textMsg });
};

textArea.on("input propertychange change", function() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(function() {
    saveToDB(textArea.val());
  }, 1000);
});

checkBox.change(function() {
  let gettingData = browser.storage.local.get("isON");
  gettingData.then(function(data) {
    console.log("click: " + data.isON);
    keyState = !data.isON;
    action(keyState);
    location.reload(true);
  }, onError);
});

window.onload = function() {
  let gettingData = browser.storage.local.get();
  gettingData.then(function(item) {
    if (item.isON === undefined) {
      keyState = false;
    } else {
      keyState = item.isON;
    }

    if (item.msg === undefined) {
    } else {
      textArea.val(item.msg);
    }
    action(keyState);
  }, onError);
};
