import { Pipe, PipeTransform } from '@angular/core';
import { Match } from '../classes/tournament';

@Pipe({
    name: 'available'
})
export class AvailablePipe implements PipeTransform {

    transform(matches: Match[]): Match[] {
        return matches.filter((match) => {
            return match.available === true;
        });
    }
}
