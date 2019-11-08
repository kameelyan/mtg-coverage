import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AdminComponent } from './modules/admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './modules/home/home.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment.prod';
import { AvailablePipe } from './shared/pipes/available.pipe';
import { DisplayOrderPipe } from './shared/pipes/display-order.pipe';
import { Top8Pipe } from './shared/pipes/top8.pipe';
import { ScorekeeperComponent } from './modules/scorekeeper/scorekeeper.component';
import { VisualDeckComponent } from './modules/visual-deck/visual-deck.component';
import { MainboardPipe } from './shared/pipes/mainboard.pipe';
import { VisualViewComponent } from './modules/visual-view/visual-view.component';
import { PilesPipe } from './shared/pipes/piles.pipe';
import { SideboardPipe } from './shared/pipes/sideboard.pipe';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';

const config: SocketIoConfig = { url: "192.168.1.25:80", options: {} };

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        FormsModule,
        FontAwesomeModule,
        BrowserModule,
        SocketIoModule.forRoot(config),
        StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        AdminComponent,
        HomeComponent,
        AvailablePipe,
        DisplayOrderPipe,
        Top8Pipe,
        ScorekeeperComponent,
        VisualDeckComponent,
        MainboardPipe,
        VisualViewComponent,
        PilesPipe,
        SideboardPipe
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
