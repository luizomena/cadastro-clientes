import { Component } from '@angular/core';
import { EmployeeService } from '../../services/empservice.service'
import { ClienteService } from '../../services/cliente.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public loading = true;

    constructor(private _employeeService: EmployeeService, private _clienteService: ClienteService)
    {
        _employeeService.loadEmitted$.subscribe(
            val => {
                this.loading = val;
            });

        _clienteService.loadEmitted$.subscribe(
            val => {
                this.loading = val;
            });
    }
}
