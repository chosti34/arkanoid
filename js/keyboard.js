// Свойства keyCode для разных клавиш
var keys = {
    'W': 87,
    'S': 83,
    'A': 65,
    'D': 68,
    'LEFT': 37,
    'RIGHT': 39
}

// Хранит код нажатой клавиши
var keyDownCode = {};

// Меняет значение объекта keyDownCode
var setKeyDownCode = function(keyCode)
{
    keyDownCode[keyCode] = true;
}

// Очищает значение объекта keyDownCode
var clearKeyDownCode = function(keyCode)
{
    keyDownCode[keyCode] = false;
}

// Проверка на нажите клавиши
var isKeyDown = function(keyName)
{
    return keyDownCode[keys[keyName]] == true;
}

// Событие при нажатии клавиши
window.onkeydown = function(keyEvent)
{
    setKeyDownCode(keyEvent.keyCode);
};

// Событие при отпускании клавиши
window.onkeyup = function(keyEvent)
{
    clearKeyDownCode(keyEvent.keyCode);
};