import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/empservice.service'

@Component({
    templateUrl: './fetchemployee.component.html'
})

export class FetchEmployeeComponent {

    public empList: any;
    public page: number = 1;
    public pageSize: number = 10;
    public totalCount: number = 0;

    constructor(public http: Http, private _router: Router, private _employeeService: EmployeeService) {
        this.getEmployees(this.page);
    }

    onPageChange(event) {
        this.getEmployees(event);
    }
    
    setLoad(val) {
        this._employeeService.emitLoad(val);
    }

    getEmployees(page: number) {
        this.setLoad(true);
        var pageSize = this.pageSize;
        this._employeeService.getEmployees(page, pageSize).subscribe(data => {
            this.page = page;
            this.totalCount = (<PageResult>data).totalCount;
            this.empList = (<PageResult>data).results;
            this.setLoad(false);
        })
    }

    getEmployeesByName(name) {
        this.setLoad(true);
        if (name != null && name.trim() != "") {
            var pageSize = this.pageSize;
            this._employeeService.getEmployeesByName(name, pageSize).subscribe((data) => {
                this.page = 1;
                this.totalCount = (<PageResult>data).totalCount;
                this.empList = (<PageResult>data).results;
                this.setLoad(false);
            }, error => console.error(error))
        }
        else
            this.getEmployees(1);
    }

    delete(employeeID) {
        this.setLoad(true);
        this._employeeService.deleteEmployee(employeeID).subscribe((data) => {
            this.getEmployees(1);
            this.setLoad(false);
        }, error => console.error(error))
    }
}

interface EmployeeData {
    employeeId: number;
    name: string;
    gender: string;
    city: string;
    department: string;

}

interface PageResult {
    results: EmployeeData;
    totalCount: number;
}
