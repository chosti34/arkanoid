// �������� keyCode ��� ������ ������
var keys = {
    'W' : 87,
    'S' : 83,
    'A' : 65,
    'D' : 68
}

// ������ ��� ������� �������
var keyDownCode = {};

// ������ �������� ������� keyDownCode
var setKeyDownCode = function(keyCode)
{
    keyDownCode[keyCode] = true;
}

// ������� �������� ������� keyDownCode
var clearKeyDownCode = function(keyCode)
{
    keyDownCode[keyCode] = false;
}

// �������� �� ������ �������
var isKeyDown = function(keyName)
{
    return keyDownCode[keys[keyName]] == true;
}

// ������� ��� ������� �������
window.onkeydown = function(keyEvent)
{
    setKeyDownCode(keyEvent.keyCode);
};

// ������� ��� ���������� �������
window.onkeyup = function(keyEvent)
{
    clearKeyDownCode(keyEvent.keyCode);
};