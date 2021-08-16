import Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
    {
        "type": "test",
        "lastDummyAlign0": "RIGHT",
        "message0": "a %1 b",
        "args0": [
            {
                "type": "input_value",
                "name": "NAME",
                "check": "Player"
            }
        ],
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "event_player",
        "message0": "参加したプレイヤー",
        "output": "Player",
        "colour": 100,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "sendmessage",
        "message0": "%1 に メッセージ %2 を送る",
        "args0": [
            {
                "type": "input_value",
                "name": "player",
                "check": "Player"
            },
            {
                "type": "input_value",
                "name": "text",
                "check": "String"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    }
]);