var keys = {'LEFT': 37, 'RIGHT': 39};

var keyDownCode = {};

var setKeyDownCode = function(keyCode)
{
    keyDownCode[keyCode] = true;
};

var clearKeyDownCode = function(keyCode)
{
    keyDownCode[keyCode] = false;
};

var isKeyDown = function(keyName)
{
    return (keyDownCode[keys[keyName]] == true);
};

window.onkeydown = function(keyboardEvent)
{
    setKeyDownCode(keyboardEvent.keyCode);
};

window.onkeyup = function(keyboardEvent)
{
    clearKeyDownCode(keyboardEvent.keyCode);
};