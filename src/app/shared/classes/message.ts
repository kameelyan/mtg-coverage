export class Message {
    text: string = '';
    owner: boolean = false;
    time: string = '';
    name: string = '';

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
