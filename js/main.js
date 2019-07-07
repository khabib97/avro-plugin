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
    browser.storage.local.set({isON: keyState});
}

function onError(error) {
    console.log(`Error Controller: ${error}`);
}

var timeoutId;
let textArea = $('#emergency_input');
textArea.on('input propertychange change', function() {
clearTimeout(timeoutId);
    timeoutId = setTimeout(function() {   
        saveToDB(textArea.val());
    }, 1000);
});

function saveToDB(textMsg)
{
    browser.storage.local.set({msg: textMsg});  
}

onOffButton.on('click', function() {
    let gettingData = browser.storage.local.get("isON");
    gettingData.then(function(data) {
        console.log(data.isON);
        keyState = !data.isON;
        action(keyState);
        location.reload(true);
    }, onError);
});

window.onload = function() {
    let gettingData = browser.storage.local.get();
    gettingData.then(function(item) {
        if (item.data === undefined) {
            keyState = false;
        } else {
            keyState = item.isON;
        }
        action(keyState);

        if(item.msg == undefined){
            //do nothing
        }else{
            textArea.val(item.msg);
        }

    }, onError);
};


