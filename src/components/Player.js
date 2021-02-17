import React from "react";
import PlayerTiles from "./PlayerTiles";

const Player = (props) => {
    return (
        <PlayerTiles enabled={props.turn}/>
    )
}

export default Player;