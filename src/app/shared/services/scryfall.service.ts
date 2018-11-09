import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ScryfallService {
    private api: string = environment.api + '/api';

    constructor(
        private http: HttpClient
    ) { }

    getCardNames() {
        return this.http.get<{}>('https://api.scryfall.com/catalog/card-names');
    }

    getCardByName(name: string) {
        return this.http.get<{}>('https://api.scryfall.com/cards/named?exact=' + name);
    }

    getCardImage(url: string) {
        const data = { url: url };
        console.log(url);
        return this.http.post<{}>(this.api + '/cardImage', data);
    }
}
