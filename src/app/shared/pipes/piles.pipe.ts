import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../classes/cards';

@Pipe({
    name: 'piles'
})
export class PilesPipe implements PipeTransform {

    transform(cards: Card[], size: number = 4): Array<Card[]> {
        let results: Array<Card[]> = [];
        while (cards.length > 0) {
            results.push(cards.splice(0, size));
        }
        return results;
    }
}
