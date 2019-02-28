import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public loading = true;

    constructor(private _clienteService: ClienteService)
    {
        _clienteService.loadEmitted$.subscribe(
            val => {
                this.loading = val;
            });
    }
}
