// Ñâîéñòâà keyCode äëÿ ðàçíûõ êëàâèø
var keys = {
    'W' : 87,
    'S' : 83,
    'A' : 65,
    'D' : 68
}

// Õðàíèò êîä íàæàòîé êëàâèøè
var keyDownCode = {};

// Ìåíÿåò çíà÷åíèå îáúåêòà keyDownCode
var setKeyDownCode = function(keyCode)
{
    keyDownCode[keyCode] = true;
}

// Î÷èùàåò çíà÷åíèå îáúåêòà keyDownCode
var clearKeyDownCode = function(keyCode)
{
    keyDownCode[keyCode] = false;
}

// Ïðîâåðêà íà íàæèòå êëàâèøè
var isKeyDown = function(keyName)
{
    return keyDownCode[keys[keyName]] == true;
}

// Ñîáûòèå ïðè íàæàòèè êëàâèøè
window.onkeydown = function(keyEvent)
{
    setKeyDownCode(keyEvent.keyCode);
};

// Ñîáûòèå ïðè îòïóñêàíèè êëàâèøè
window.onkeyup = function(keyEvent)
{
    clearKeyDownCode(keyEvent.keyCode);
};
