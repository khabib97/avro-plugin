let onOffButton = $('#on_off_key');
let keyState;

var onTheButton = function() {
    onOffButton.html(" ON ");
};

var offTheButton = function() {
    onOffButton.html("OFF");
};

var switchLanguage = function(isON) {
    $('textarea, input').avro({
        'bangla': isON
    });
};

var buttonSwitcher = function(isON) {
    if (isON) {
        onTheButton();
    } else {
        offTheButton();
    }
};

var _action = function(keyState){
    buttonSwitcher(keyState);
    switchLanguage(keyState);
    chrome.storage.sync.set({
        isON: keyState
    }, function() {});
};

onOffButton.on('click', function() {
    chrome.storage.sync.get('isON', function(data) {
        keyState = !data.isON;
        _action(keyState);
        location.reload(true);
    });
    
    location.reload(true);
});

window.onload = function() {
    chrome.storage.sync.get('isON', function(data) {
        if (data.isON === undefined) {
            keyState = false;
        } else {
            keyState = data.isON;
        }
        _action(keyState);
        console.log('keyState:' + keyState);
    });
};