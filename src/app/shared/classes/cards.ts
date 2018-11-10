export class Card {
    name: string = null;
    mainboard: boolean = false;
    image: string = null;
    scryfall: any = null;
    type: string = null;
    cmc: number = 0;
    id: string = null;
    url: string = null;

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

    getTypePriority(): number {
        if (this.type.includes('Creature')) {
            return 4;
        }
        if (this.type.includes('Planeswalker')) {
            return 3;
        }
        if (this.type.includes('Instant') || this.type.includes('Sorcery')) {
            return 2;
        }
        if (this.type.includes('Land')) {
            return 0;
        }
        return 1;
    }
}

export class ScryFallIdentifier {
    name: string = null;

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
