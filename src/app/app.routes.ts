import { Routes } from '@angular/router';
import { AuthenticationGuard } from './middleware/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HomeListComponent } from './components/home-list/home-list.componenet';
import { PoolComponent } from './components/pool/pool.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthenticationGuard], children: [
        { path: '', component: HomeListComponent },
        { path: 'pool/:id', component: PoolComponent }
    ]},
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];