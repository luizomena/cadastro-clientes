import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchEmployeeComponent } from '../fetchemployee/fetchemployee.component';
import { EmployeeService } from '../../services/empservice.service';

@Component({
    templateUrl: './AddEmployee.component.html'
})

export class createemployee implements OnInit {
    employeeForm: FormGroup;
    title: string = "Inclusão";
    employeeId: number;
    errorMessage: any;
    cityList: Array<any> = [];

    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _employeeService: EmployeeService, private _router: Router) {
        if (this._avRoute.snapshot.params["id"]) {
            this.employeeId = this._avRoute.snapshot.params["id"];
        }

        this.setLoad(true);

        this.employeeForm = this._fb.group({
            employeeId: 0,
            name: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            department: ['', [Validators.required]],
            city: ['', [Validators.required]]
        })
    }

    setLoad(val) {
        this._employeeService.emitLoad(val);
    }

    ngOnInit() {

        this._employeeService.getCityList().subscribe(
            data => this.cityList = data
        )

        if (this.employeeId > 0) {
            this.title = "Edição";
            this._employeeService.getEmployeeById(this.employeeId)
                .subscribe(resp => {
                    this.employeeForm.setValue(resp);
                    this.setLoad(false);
                }, error => this.errorMessage = error);
        }
        else
            this.setLoad(false);
    }

    save() {

        if (!this.employeeForm.valid) {
            return;
        }

        this.setLoad(true);

        if (this.title == "Inclusão") {
            this._employeeService.saveEmployee(this.employeeForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-employee']);
                }, error => this.errorMessage = error)
        }
        else if (this.title == "Edição") {
            this._employeeService.updateEmployee(this.employeeForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-employee']);
                }, error => this.errorMessage = error)
        }
    }

    cancel() {
        this._router.navigate(['/fetch-employee']);
    }

    get name() { return this.employeeForm.get('name'); }
    get gender() { return this.employeeForm.get('gender'); }
    get department() { return this.employeeForm.get('department'); }
    get city() { return this.employeeForm.get('city'); }
}
