import { NgModule } from '@angular/core';
import { EmployeeService } from './services/empservice.service';
import { ClienteService } from './services/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxLoadingModule } from 'ngx-loading';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchEmployeeComponent } from './components/fetchemployee/fetchemployee.component'
import { createemployee } from './components/addemployee/AddEmployee.component'
import { ListaClienteComponent } from './components/listacliente/listacliente.component'
import { NovoClienteComponent } from './components/novocliente/novocliente.component'

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        FetchEmployeeComponent,
        createemployee,
        ListaClienteComponent,
        NovoClienteComponent,
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'lista-cliente', pathMatch: 'full' },
            { path: 'fetch-employee', component: FetchEmployeeComponent },
            { path: 'register-employee', component: createemployee },
            { path: 'employee/edit/:id', component: createemployee },
            { path: 'lista-cliente', component: ListaClienteComponent },
            { path: 'novo-cliente', component: NovoClienteComponent },
            { path: 'cliente/edit/:id', component: NovoClienteComponent },
            { path: '**', redirectTo: 'lista-cliente' }
        ]),
        NgxPaginationModule,
        NgxLoadingModule.forRoot({}),
        SweetAlert2Module.forRoot({
            buttonsStyling: false,
            customClass: 'modal-content',
            confirmButtonClass: 'btn btn-danger',
            cancelButtonClass: 'btn btn-default',
            confirmButtonText: 'Sim',
            cancelButtonText: "Voltar",
            showCancelButton: true
        })
    ],
    providers: [EmployeeService, ClienteService]
})
export class AppModuleShared {
}
