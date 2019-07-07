let onOffButton = $('#on_off_key');
let keyState;

var onTheButton = function() {
    onOffButton.html(" ON ");
};

var offTheButton = function() {
    onOffButton.html("OFF");
};

var switchLanguage = function(isON) {
    $('textarea, input').avro({'bangla': isON});
};

var buttonSwitcher = function(isON) {
    if (isON) {
        onTheButton();
    } else {
        offTheButton();
    }
}

function action(keyState) {
    buttonSwitcher(keyState);
    switchLanguage(keyState);
    browser.storage.local.set({data: {isON: keyState}});
}

function onError(error) {
    console.log(`Error Controller: ${error}`);
}

onOffButton.on('click', function() {
    let gettingData = browser.storage.local.get("data");
    gettingData.then(function(item) {
        console.log("onclick Call");
        console.log("onclick value : " + item.data.isON);
        console.log(item.data.isON);
        keyState = !item.data.isON;
        action(keyState);
        location.reload(true);
    }, onError);
});

window.onload = function() {
    let gettingData = browser.storage.local.get("data");
    gettingData.then(function(item) {
        console.log("Init Call");
        //console.log("init value : " + item.data.isON);
        if (item.data === undefined) {
            keyState = false;
        } else {
            keyState = item.data.isON;
        }
        action(keyState);
    }, onError);
};


