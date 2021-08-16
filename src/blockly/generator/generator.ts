import {Generator} from "blockly";

export const spigotGenerator: any = new Generator("spigot-api");

spigotGenerator["get_player"] = function(block: any) {
    const text_mcid = block.getFieldValue('mcid');
    const code = "Bukkit.getPlayer(\""+ text_mcid +"\")";
    return [code, 0];
}

spigotGenerator["text"] = function(block: any) {
    let code = block.getFieldValue('TEXT');
    return ["\"" + code + "\"", 0];
};

spigotGenerator["set_gamemode"] = function(block: any) {
    const gamemode = block.getFieldValue('gamemode');
    const player = spigotGenerator.valueToCode(block, "player", 0);
    let code = player + ".setGameMode(GameMode." + gamemode + ");";
    return code;
};

spigotGenerator["sendmessage"] = function(block: any) {
    const player = spigotGenerator.valueToCode(block, "player", 0);
    const text = spigotGenerator.valueToCode(block, "text", 0);
    let code = player + ".sendMessage(" + text + ");";
    return code;
};

spigotGenerator.scrub_ = function(block: any, code: string, opt_thisOnly: any) {
    const nextBlock =
        block.nextConnection && block.nextConnection.targetBlock();
    let nextCode = '';
    if (nextBlock) {
        nextCode =
            opt_thisOnly ? '' : '\n' + spigotGenerator.blockToCode(nextBlock);
    }
    return code + nextCode;
};
