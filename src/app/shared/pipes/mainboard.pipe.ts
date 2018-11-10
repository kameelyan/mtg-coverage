import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../classes/cards';

@Pipe({
    name: 'mainboard'
})
export class MainboardPipe implements PipeTransform {

    transform(cards: Card[]): Card[] {
        cards.sort((a: Card, b: Card) => {
            // sort by type
            let result = b.getTypePriority() - a.getTypePriority();
            // then by cmc
            if (result === 0) {
                result = a.cmc - b.cmc;
            }
            // then by name
            if (result === 0) {
                if (a.name < b.name) { result = -1; }
                if (a.name > b.name) { result = 1; }
            }
            return result;
        });
        cards = cards.filter(card => card.mainboard);
        return cards;
    }

}
