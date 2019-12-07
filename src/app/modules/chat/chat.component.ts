import { Component, OnInit, HostBinding, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { TournamentService } from '../../shared/services/tournament.service';
import { NgForm } from '@angular/forms';
import { Message } from '../../shared/classes/message';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    @HostBinding('class') class = 'd-flex flex-column flex-fill';
    @Output() newMessage = new EventEmitter<{}>();
    @ViewChild('form', { static: false }) form: NgForm;
    messages: Array<Message> = [];
    name: string;
    message: string;
    
    constructor(private tournamentService: TournamentService) { }

    sendMessage() {
        const now = new Date();
        const hours = '00' + now.getHours().toString();
        const minutes = '00' + now.getMinutes().toString();
        const seconds = '00' + now.getSeconds().toString();

        const message = new Message({
            text: this.message,
            owner: true,
            time: hours.slice(-2) + ':' + minutes.slice(-2) + ':' + seconds.slice(-2),
            name: this.name
        });
        this.tournamentService.sendChatMessage(message);
        this.messages.push(message);
        this.message = null;
    }

    ngOnInit() {
        this.tournamentService.receiveChatMessage().subscribe(
            (data) => {
                if (data) {
                    data['owner'] = false;
                    const message = new Message(data);
                    this.messages.push(message);
                    this.newMessage.emit(message);
                }
            }
        );
    }
}
