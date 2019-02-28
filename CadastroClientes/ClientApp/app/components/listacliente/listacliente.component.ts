import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ClienteService } from '../../services/cliente.service'

@Component({
    templateUrl: './listacliente.component.html'
})

export class ListaClienteComponent {

    public listaCliente: any;
    public page: number = 1;
    public pageSize: number = 10;
    public totalCount: number = 0;

    constructor(public http: Http, private _router: Router, private _clienteService: ClienteService) {
        this.getCliente(this.page);
    }

    onPageChange(event) {
        this.getCliente(event);
    }
    
    setLoad(val) {
        this._clienteService.emitLoad(val);
    }

    getCliente(page: number) {
        this.setLoad(true);
        var pageSize = this.pageSize;
        this._clienteService.getCliente(page, pageSize).subscribe(data => {
            this.page = page;
            this.totalCount = (<PageResult>data).totalCount;
            this.listaCliente = (<PageResult>data).results;
            this.setLoad(false);
        })
    }

    getClienteByName(name) {
        this.setLoad(true);
        if (name != null && name.trim() != "") {
            var pageSize = this.pageSize;
            this._clienteService.getClienteByName(name, pageSize).subscribe((data) => {
                this.page = 1;
                this.totalCount = (<PageResult>data).totalCount;
                this.listaCliente = (<PageResult>data).results;
                this.setLoad(false);
            }, error => console.error(error))
        }
        else
            this.getCliente(1);
    }

    delete(clienteID) {
        this.setLoad(true);
        this._clienteService.deleteCliente(clienteID).subscribe((data) => {
            this.getCliente(1);
            this.setLoad(false);
        }, error => console.error(error))
    }
}

interface ClienteData {
    clienteId: number;
    nome: string;
    nascimento: string;
    cpf: string;
    rg: string;

}

interface PageResult {
    results: ClienteData;
    totalCount: number;
}
