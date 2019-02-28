import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ListaClienteComponent } from '../listacliente/listacliente.component';
import { ClienteService } from '../../services/cliente.service';

@Component({
    templateUrl: './novocliente.component.html'
})

export class NovoClienteComponent implements OnInit {
    
    clienteForm: FormGroup;
    endereco: FormArray;
    telefone: FormArray;
    redeSocial: FormArray;
    title: string = "Inclusão";
    clienteId: number;
    errorMessage: any;
    listaTipoEndereco: Array<any> = [];
    listaTipoTelefone: Array<any> = [];
    listaTipoRedeSocial: Array<any> = [];
    
    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _clienteService: ClienteService, private _router: Router) {
        if (this._avRoute.snapshot.params["id"]) {
            this.clienteId = this._avRoute.snapshot.params["id"];
        }

        this.setLoad(true);

        this.clienteForm = this._fb.group({
            clienteId: 0,
            nome: ['', [Validators.required]],
            nascimento: ['', [Validators.required]],
            cpf: ['', [Validators.required, Validators.maxLength(11)]],
            rg: ['', [Validators.required]],
            endereco: this._fb.array([]),
            telefone: this._fb.array([]),
            redeSocial: this._fb.array([])
        })
    }

    createEndereco(): FormGroup {
        return this._fb.group({
            enderecoId: 0,
            cep: ['', [Validators.required, Validators.maxLength(8)]],
            logradouro: ['', [Validators.required]],
            numero: ['', [Validators.required]],
            complemento: [''],
            bairro: ['', [Validators.required]],
            cidade: ['', [Validators.required]],
            estado: ['', [Validators.required]],
            pais: ['', [Validators.required]],
            clienteId: 0,
            tipoEnderecoId: 0
        })
    }

    createTelefone(): FormGroup{
        return this._fb.group({
            telefoneId: 0,
            numero: ['', [Validators.required, Validators.maxLength(11)]],
            clienteId: 0,
            tipoTelefoneId: 0
        })
    }

    createRedeSocial(): FormGroup{
        return this._fb.group({
            redeSocialId: 0,
            link: ['', [Validators.required]],
            clienteId: 0,
            tipoRedeSocialId: 0
        })
    }

    setLoad(val) {
        this._clienteService.emitLoad(val);
    }

    ngOnInit() {

        this._clienteService.getTipoEndereco().subscribe(
            data => this.listaTipoEndereco = data
        )
        this._clienteService.getTipoTelefone().subscribe(
            data => this.listaTipoTelefone = data
        )
        this._clienteService.getTipoRedeSocial().subscribe(
            data => this.listaTipoRedeSocial = data
        )

        if (this.clienteId > 0) {
            this.title = "Edição";
            this._clienteService.getClienteById(this.clienteId)
                .subscribe(resp => {
                    const endereco = this.clienteForm.get('endereco') as FormArray;
                    while (endereco.length) {
                        endereco.removeAt(0);
                    }
                    const telefone = this.clienteForm.get('telefone') as FormArray;
                    while (telefone.length) {
                        telefone.removeAt(0);
                    }    
                    const redeSocial = this.clienteForm.get('redeSocial') as FormArray;
                    while (redeSocial.length) {
                        redeSocial.removeAt(0);
                    }                  
                    this.clienteForm.patchValue(resp);
                    
                    resp.endereco.forEach(e => endereco.push(this._fb.group({
                        enderecoId: e.enderecoId,
                        cep: [e.cep, [Validators.required, Validators.maxLength(8)]],
                        logradouro: [e.logradouro, [Validators.required]],
                        numero: [e.numero, [Validators.required]],
                        complemento: e.complemento,
                        bairro: [e.bairro, [Validators.required]],
                        cidade: [e.cidade, [Validators.required]],
                        estado: [e.estado, [Validators.required]],
                        pais: [e.pais, [Validators.required]],
                        clienteId: e.clienteId,
                        tipoEnderecoId: e.tipoEnderecoId
                    })));

                    resp.telefone.forEach(t => telefone.push(this._fb.group({
                        telefoneId: t.telefoneId,
                        numero: [t.numero, [Validators.required, Validators.maxLength(11)]],
                        clienteId: t.clienteId,
                        tipoTelefoneId: t.tipoTelefoneId
                    })));

                    resp.redeSocial.forEach(r => redeSocial.push(this._fb.group({
                        redeSocialId: r.redeSocialId,
                        link: [r.link, [Validators.required]],
                        clienteId: r.clienteId,
                        tipoRedeSocialId: r.tipoRedeSocialId
                    })));

                    //this.clienteForm.setValue(resp);
                    this.setLoad(false);
                }, error => this.errorMessage = error);
        }
        else
            this.setLoad(false);
    }

    save() {

        if (!this.clienteForm.valid) {
            return;
        }

        this.setLoad(true);

        if (this.title == "Inclusão") {
            this._clienteService.saveCliente(this.clienteForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/lista-cliente']);
                }, error => this.errorMessage = error)
        }
        else if (this.title == "Edição") {
            this._clienteService.updateCliente(this.clienteForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/lista-cliente']);
                }, error => this.errorMessage = error)
        }
    }

    cancel() {
        this._router.navigate(['/lista-cliente']);
    }

    addEndereco(): void  {
        this.endereco = this.clienteForm.get('endereco') as FormArray;
        this.endereco.push(this.createEndereco());
    }

    addTelefone(): void  {
        this.telefone = this.clienteForm.get('telefone') as FormArray;
        this.telefone.push(this.createTelefone());
    }

    addRedeSocial(): void  {
        this.redeSocial = this.clienteForm.get('redeSocial') as FormArray;
        this.redeSocial.push(this.createRedeSocial());
    }

    deleteEndereco(index) {
        var _i = index;
            
        this.endereco = this.clienteForm.get('endereco') as FormArray;
        this.endereco.removeAt(_i);
    }

    deleteTelefone(index) {
        var _i = index;
            
        this.telefone = this.clienteForm.get('telefone') as FormArray;
        this.telefone.removeAt(_i);
    }

    deleteRedeSocial(index) {
        var _i = index;
            
        this.redeSocial = this.clienteForm.get('redeSocial') as FormArray;
        this.redeSocial.removeAt(_i);
    }

    get nome() { return this.clienteForm.get('nome'); }
    get nascimento() { return this.clienteForm.get('nascimento'); }
    get cpf() { return this.clienteForm.get('cpf'); }
    get rg() { return this.clienteForm.get('rg'); }
}
