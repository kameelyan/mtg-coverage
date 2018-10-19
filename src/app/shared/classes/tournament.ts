export class Tournament {
    info: Array<Info> = [];
    matches: Array<Match> = [];

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
    name: string = null;
    label: string = null;
    type: string = null;
    value: string = null;
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
