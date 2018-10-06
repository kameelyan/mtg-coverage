import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AdminComponent } from './modules/admin/admin.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        AdminComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
