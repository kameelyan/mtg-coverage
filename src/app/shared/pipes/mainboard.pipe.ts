import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../classes/cards';

@Pipe({
    name: 'mainboard'
})
export class MainboardPipe implements PipeTransform {

    transform(cards: Card[]): Card[] {
        cards.sort((a: Card, b: Card) => {
            let result = b.getTypePriority() - a.getTypePriority();
            if (result === 0) {
                result = a.cmc - b.cmc;
            }
            return result;
        });
        cards = cards.filter(card => card.mainboard);
        return cards;
    }

}
