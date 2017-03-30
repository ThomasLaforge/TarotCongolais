export const DEFAULT_NB_PLAYER = 4;

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

export interface LobbyList {
    name: string,
    maxPlayers: number, 
    playerOn: number 
}

// ------------------------- //
// Socket message definition //
// ------------------------- //

export interface ChatLine {
    pseudo: string
    msg: string
}