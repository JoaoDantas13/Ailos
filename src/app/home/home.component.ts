import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validacoes } from '../validacoes/validacoes';
import { NgToastService } from 'ng-angular-popup';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading = false;
  formulario!: FormGroup;
  dados: boolean = false;

  constructor(private formBuilder: FormBuilder, private toast: NgToastService) { }


  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      cpf: ['', Validators.compose([Validators.required, Validacoes.ValidaCpf])
      ],
    });
  }

  verificarCPf(): void {
    const cpf = '45064339801';
    if (!this.formulario.valid) {
      this.toast.error({ detail: "Atenção!", summary: "CPF Inválido" })
    } else if (this.formulario.get('cpf')?.value === cpf) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.dados = true;
      }, 3000);
    } else {
      this.toast.info({ detail: "Atenção!", summary: "CPF não existe em nosso banco!" })
    }
  }

  get cpf() {
    return this.formulario.get('cpf');
  }

}
