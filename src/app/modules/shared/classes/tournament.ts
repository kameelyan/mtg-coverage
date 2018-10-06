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
}

export class Info {
  name: string = null;
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
  name: string = null;
  title: string = null;
  order: number = null;
  players: Players = null;

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

export class Players {
  leftPlayer: Player = null;
  rightPlayer: Player = null;

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

export class Player {
  name: string = null;
  deck: string = null;
  record: string = null;
  life: number = null;
  infect: number = null;
  wins: number = null;
  sideboard: string = null;

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
