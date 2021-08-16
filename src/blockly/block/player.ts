import Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
    {
        "type": "set_gamemode",
        "message0": "%1 のゲームモードを %2 に変更する",
        "args0": [
            {
                "type": "input_value",
                "name": "player",
                "check": "Player"
            },
            {
                "type": "field_dropdown",
                "name": "gamemode",
                "options": [
                    [
                        "クリエイティブ",
                        "CREATIVE"
                    ],
                    [
                        "サバイバル",
                        "SURVIVAL"
                    ]
                ]
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 0,
        "tooltip": "",
        "helpUrl": ""
    },
    {
        "type": "get_player",
        "message0": "mcid: %1",
        "args0": [
            {
                "type": "field_input",
                "name": "mcid",
                "text": ""
            }
        ],
        "output": "Player",
        "colour": 285,
        "tooltip": "",
        "helpUrl": ""
    }
]);