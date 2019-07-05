let onOffButton = $('#on_off_key');
let keyState;

var onTheButton = function(){
        onOffButton.html(" ON ");
    };

    var offTheButton = function(){
        onOffButton.html("OFF");
    };

    var switchLanguage = function(isON){
        $('textarea, input').avro({'bangla':isON});
    };

    var buttonSwitcher = function(isON){
        if(isON){
            onTheButton();
        }else{
            offTheButton();
        }
    }

    onOffButton.on('click',function(){
        chrome.storage.sync.get('isON', function(data) {
            buttonSwitcher(!data.isON);
            switchLanguage(!data.isON);
            chrome.storage.sync.set({isON: !data.isON},function(){});
            location.reload(true);
        });
    });

window.onload = function() {
    chrome.storage.sync.get('isON', function(data) {
        if(data.isON === undefined){
            keyState = false;
            offTheButton();
        }
        else{
            keyState = data.isON;
            buttonSwitcher(data.isON); 
        }
        switchLanguage(keyState);
    });
};


