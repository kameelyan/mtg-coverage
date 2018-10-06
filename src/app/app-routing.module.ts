import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AdminComponent } from './modules/admin/admin.component';
import { TournamentResolver } from './shared/services/tournament-resolver';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        resolve: {
            tournament: TournamentResolver
        }
    },
    {
        path: 'admin',
        component: AdminComponent,
        resolve: {
            tournament: TournamentResolver
        }
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
