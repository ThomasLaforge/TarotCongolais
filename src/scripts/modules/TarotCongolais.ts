import { Hand } from './Hand'
import { Card } from './Card'

export const DEFAULT_NB_PLAYER = 2;

export enum GameState {
    WaitingPlayer,
    WaitingPlayersToBeReady,
    InGame,
    WaitingPlayersToBet,
    Bet,
    WaitingPlayersToPlay,
    Play
}

export interface BetInterface {
    player:PlayerInterface;
    bet:number;
}

export interface CardInterface {

}

export interface DeckInterface {

}

export interface GameInterface {

}

export interface HandInterface {

}

export interface PlayerInterface {

}

export interface PlayerCollectionInterface {

}

export interface TimerInterface {

}

export interface TrickInterface {

}

export interface TurnInterface {

}

export interface PlayInterface {
    username:string;
    hand:HandInterface;
    pv:number;
    socketId:any;
}

export interface HistoryInterface {

}

export interface ActionHistoryInterface {
    
}

// ------------- //
// UI interfaces //
// ------------- //

export interface LobbyListElt {
    name: string,
    maxPlayers: number, 
    playerOn: number 
}

export interface playerInfos {
    name?: string,
    pv?: number,
    betValue?: number,
    nbTricks?: number,
    isReady?: boolean,
    cardPlayed?: Card,
    handLength?: number
}

export interface myPlayerInfos extends playerInfos {
    hand?: Hand
}

// others? : playerInfos[],
export interface VueBoardData {
    others? : {},
    me? : myPlayerInfos,
    gameState?: GameState,
}

export interface VueChatData {
    chatHistory: Array<string>,
    newMessage: string
}

export interface VueLobbyData {
    selectedGameRoomId: string,
    gameList : Array<LobbyListElt>
}

// ------------------------- //
// Socket message definition //
// ------------------------- //

export interface ChatLine {
    pseudo: string
    msg: string
}