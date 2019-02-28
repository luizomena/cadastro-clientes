import { NgModule } from '@angular/core';
import { ClienteService } from './services/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxLoadingModule } from 'ngx-loading';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { AppComponent } from './components/app/app.component';
import { ListaClienteComponent } from './components/listacliente/listacliente.component'
import { NovoClienteComponent } from './components/novocliente/novocliente.component'

@NgModule({
    declarations: [
        AppComponent,
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
    providers: [ClienteService]
})
export class AppModuleShared {
}
