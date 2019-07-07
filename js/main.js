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
        let gettingData = browser.storage.sync.get("data");
        gettingData.then(onGot,onError);
        /*let isON = data.isON;
        console.log(isON);
        buttonSwitcher(!isON);
        switchLanguage(!isON);
        browser.storage.sync.set({
            data: {isON: !isON}
        });*/
        //location.reload(true);
        
    });

    function onGot(item) {
        console.log(item);
    }
      
    function onError(error) {
        console.log(`Error: ${error}`);
    }

window.onload = function() {
    let gettingData = browser.storage.sync.get("data");
    gettingData.then(onGot,onError);
    /*let isON = data.isON;
    console.log(data);
    
    if(isON === undefined){
        keyState = false;
    }
    else{
        keyState = isON;
         
    }*/
    browser.storage.sync.set({
        data: {isON: keyState}
    });
    /*buttonSwitcher(isON);
    switchLanguage(keyState);*/
    
};


