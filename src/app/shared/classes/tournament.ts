export class Tournament {
    info: Array<Info> = [];
    matches: Array<Match> = [];
    scorekeeper: ScoreKeeper = null;
    top8: Top8 = null;

    constructor(data?: any) {
        if (data) {
            const props = Object.keys(this);
            for (const prop in props) {
                if (data[props[prop]]) {
                    switch (props[prop]) {
                        case 'info':
                            if (Array.isArray(data.info)) {
                                this.info = data.info.map(input => {
                                    return new Info(input);
                                });
                            } else {
                                this.info = data.info || [];
                            }
                            break;
                        case 'matches':
                            if (Array.isArray(data.matches)) {
                                this.matches = data.matches.map(match => {
                                    return new Match(match);
                                });
                            } else {
                                this.matches = data.matches || [];
                            }
                            break;
                        case 'scorekeeper':
                            this.scorekeeper = new ScoreKeeper(data.scorekeeper);
                            break;
                        case 'top8':
                            this.top8 = new Top8(data.top8);
                            break;
                        default:
                            this[props[prop]] = data[props[prop]];
                    }
                }
            }
        }
    }

    getInfo(name: string): string {
        const info = this.info.filter((input) => {
            return input.name === name;
        }).shift();
        return info !== undefined ? info.value : '';
    }
}

export class Info {
    name: string = '';
    label: string = '';
    type: string = '';
    value: string = '';
    order: number = null;

    constructor(data?: any) {
        if (data) {
            const props = Object.keys(this);
            for (const prop in props) {
                if (data[props[prop]]) {
                    this[props[prop]] = data[props[prop]];
                }
            }
        }
    }
}

export class Match {
    available: boolean = false;
    name: string = null;
    title: string = null;
    order: number = null;
    leftPlayer: Player = null;
    rightPlayer: Player = null;
    begin: boolean = false;

    constructor(data?: any) {
        if (data) {
            const props = Object.keys(this);
            for (const prop in props) {
                if (data[props[prop]]) {
                    switch (props[prop]) {
                        case 'leftPlayer':
                        case 'rightPlayer':
                            this[props[prop]] = new Player(data[props[prop]]);
                            break;
                        default:
                            this[props[prop]] = data[props[prop]];
                    }
                }
            }
        }
    }
}

export class Player {
    name: string = null;
    deck: string = null;
    record: string = '0-0';
    life: number = 20;
    infect: number = 0;
    gamewins: number = 0;
    sideboard: string = '';

    constructor(data?: any) {
        if (data) {
            const props = Object.keys(this);
            for (const prop in props) {
                if (data[props[prop]]) {
                    this[props[prop]] = data[props[prop]];
                }
            }
        }
    }
}

export class ScoreKeeper {
    outstandingMatches: number = 0;
    playersToWatch: Array<PlayerToWatch> = [];

    constructor(data?: any) {
        if (data) {
            const props = Object.keys(this);
            for (const prop in props) {
                if (data[props[prop]]) {
                    switch (props[prop]) {
                        case 'playersToWatch':
                            if (Array.isArray(data.playersToWatch)) {
                                this.playersToWatch = data.playersToWatch.map(player => {
                                    return new PlayerToWatch(player);
                                });
                            } else {
                                this.playersToWatch = data.playersToWatch || [];
                            }
                            break;
                        default:
                            this[props[prop]] = data[props[prop]];
                    }
                }
            }
        }
        let remaining: number = 6 - this.playersToWatch.length;
        for (let i = 0; i < remaining; i++) {
            this.playersToWatch.push(new PlayerToWatch());
        }
    }
}

export class PlayerToWatch {
    name: string = '';
    record: string = '';
    standing: string = '';

    constructor(data?: any) {
        if (data) {
            const props = Object.keys(this);
            for (const prop in props) {
                if (data[props[prop]]) {
                    this[props[prop]] = data[props[prop]];
                }
            }
        }
    }
}

export class Top8 {
    quarters: Array<PlayerDeck> = [];
    semis: Array<PlayerDeck> = [];
    finals: Array<PlayerDeck> = [];

    populateRemaining(round, total) {
        let remaining: number = total - round.length;
        for (let i = 0; i < remaining; i++) {
            round.push(new PlayerDeck());
        }
    }

    clearRound(round: string) {
        this[round].forEach(player => {
            player.deck = '';
            player.name = '';
        });
    }

    constructor(data?: any) {
        if (data) {
            const props = Object.keys(this);
            for (const prop in props) {
                if (data[props[prop]]) {
                    if (Array.isArray(data.playersToWatch)) {
                        this[props[prop]] = data[props[prop]].map(player => {
                            return new PlayerDeck(player);
                        });
                    } else {
                        this[props[prop]] = data[props[prop]] || [];
                    }
                }
            }
        }
        this.populateRemaining(this.quarters, 8);
        this.populateRemaining(this.semis, 4);
        this.populateRemaining(this.finals, 2);
    }
}

export class PlayerDeck {
    name: string = '';
    deck: string = '';

    constructor(data?: any) {
        if (data) {
            const props = Object.keys(this);
            for (const prop in props) {
                if (data[props[prop]]) {
                    this[props[prop]] = data[props[prop]];
                }
            }
        }
    }
}
