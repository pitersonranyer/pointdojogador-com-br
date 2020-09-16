import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MensageriaService } from './mensageria.service';

/**
 * @author Felipe
 */
@Injectable()
export class UtilService {

    constructor(private mensageriaService: MensageriaService) { }


    private ESTILO_EDICAO = {
        titulo: 'Editar',
        icone: 'fas fa-pencil'
    };

    private ESTILO_CADASTRO = {
        titulo: 'Cadastrar',
        icone: 'fas fa-plus'
    };

    public TRADUCAO_CALENDARIO = {
        firstDayOfWeek: 0,
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        monthNames:
            ['Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        today: 'Hoje',
        clear: 'Limpar'
    };

    /**
     * @author Felipe
     * @description Função que retorna o estilo para preencher o título do formulario de cadastro ou edição
     * @param tipo Deve ser informado 'cadastro' ou 'edicao'
     * @returns objeto com os atributos 'título' e 'icone'
     */
    public getEstiloFormulario(tipo: string): Object {
        switch (tipo) {
            case 'cadastro':
                return this.ESTILO_CADASTRO;
            case 'edicao':
                return this.ESTILO_EDICAO;
            default:
                this.mensageriaService.setMensagemErro(true, false, 'Erro Parâmetro', 'Informe \'cadastro\' ou \'edicao\'');
                break;
        }
    }

    /**
     * @author Felipe
     * @description Resgata o usuário autenticado
     */

    /**
     * @description Resgata url do backend
     * @returns string url do backend
     */
    getUrlBackend() {
     //   const url = window.location.href;
     //   console.log('location', window.location.href);
     //   console.log(url.match);
     //   if (url.match(/localhost/)) {
     //       return 'http://localhost:3000/api';
     //   }
     //   if (url.match(/pointdojogador/)) {
            return 'http://pointdojogador-api-com-br.umbler.net/api';
     //   }
    }


    /**
     * @description Resgata a versão atual do sistema
     * @returns 'Versão 0.0.0' onde 0.0.0 é o versionamento semântico
     */
    getVersaoSistema(): any {
        return { 'numero': 'Versão 1.0.0', 'data': '16/03/2019' };
    }

    /**
     * @description Resgata o rodapé de página
     * @returns string rodapé com os telefones do suporte técnico
     */
    getRodapeSuporte(): string {
        return '© ' + (new Date().getFullYear()) + ' Projeto50M';
    }

    /**
     * @description Verifica se o formulário foi preenchido corretamente
     * @param formulario a ser verificado
     * @returns true(formulário válido), false(formulário inválido e notificações realizadas)
     */
    validarFormulario(formulario: FormGroup): boolean {
        if (!formulario.valid) {
            this.verificaValidacoesForm(formulario);
            this.mensageriaService.setMensagemCamposObrigatorios();
            return false;
        }
        return true;
    }

    /**
     * @description Verifica se o formulário é válido destacando as inconsistências em caso de formulário inválido
     * @returns void
     */
    public verificaValidacoesForm(formGroup: FormGroup) {
        let controle: AbstractControl;
        Object.keys(formGroup.controls).forEach(campo => {
            controle = formGroup.get(campo);
            controle.markAsDirty();
            if (controle instanceof FormGroup) {
                this.verificaValidacoesForm(controle);
            }
        });
    }

    /**
     * @description Verifica se o campoCPF passado por parâmetro tem valor válido
     * @returns boolean true(cpf válido), false(cpf inválido e sinaliza o campo)
     */
    validarCPF(campoCPF: any): boolean {
        this.mensageriaService.limparMensagens();
        if (campoCPF.value === '' || campoCPF.value === null) { return true; }
        const textoMensagem = 'CPF inválido.';
        let Soma = 0;
        let Resto = 0;
        let cpf = campoCPF.value + '';
        if (cpf.indexOf('.') !== -1) {
            cpf = this.retiraMascaraCPF(cpf) + '';
        }
        console.log(cpf);

        if ((cpf === '00000000000') || (cpf === '11111111111') || (cpf === '22222222222') ||
            (cpf === '33333333333') || (cpf === '44444444444') || (cpf === '55555555555') ||
            (cpf === '66666666666') || (cpf === '77777777777') || (cpf === '88888888888') ||
            (cpf === '99999999999')) {
            campoCPF.setErrors({ 'erro': true });
            campoCPF.markAsDirty();
            this.mensageriaService.setMensagemAlerta(true, true, textoMensagem); return false;
        }
        for (let i = 1; i <= 9; i++) {
            // tslint:disable-next-line:radix
            Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        Resto = (Soma * 10) % 11;
        if ((Resto === 10) || (Resto === 11)) {
            Resto = 0;
        }
        // tslint:disable-next-line:radix
        if (Resto !== parseInt(cpf.substring(9, 10))) {
            campoCPF.setErrors({ 'erro': true });
            campoCPF.markAsDirty();
            this.mensageriaService.setMensagemAlerta(true, true, textoMensagem);
            return false;
        }
        Soma = 0;
        for (let i = 1; i <= 10; i++) {
            // tslint:disable-next-line:radix
            Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        Resto = (Soma * 10) % 11;
        if ((Resto === 10) || (Resto === 11)) {
            Resto = 0;
        }
        // tslint:disable-next-line:radix
        if (Resto !== parseInt(cpf.substring(10, 11))) {
            campoCPF.setErrors({ 'erro': true });
            campoCPF.markAsDirty();
            this.mensageriaService.setMensagemAlerta(true, true, textoMensagem);
            return false;
        }
        return true;
    }

    /**
     * @description Retira os pontos e o traço do CPF
     * @returns number
     */
    public retiraMascaraCPF(cpf: string) {
        return this.zeroEsquerda(cpf.replace('.', '').replace('.', '').replace('-', ''), 11);
    }

    /**
     * @description Ordena um objeto array pelo campo passado por parâmentro
     * @returns objeto[] ordenado
     */
    ordenarObjetoArray(objeto: any[], campo: string): any[] {
        return objeto.sort((a, b) => a[campo] - b[campo]);
    }

    /**
     * @description Utilizado no componente AutoComplete para filtragem
     */
    filtro(query: any, array: any[]): any[] {
        const filtragem: any[] = [];
        for (const filtro of array) {
            if (filtro.value.toUpperCase().indexOf(query.toUpperCase()) === 0) {
                filtragem.push(filtro);
            }
        }
        return filtragem;
    }


    /**
     * @description Tratamento para telefones de 8 ou 9 dígitos
     * @returns retorna mascara para telefone -> '(99)99999-9999' ou '(99)9999-9999?9'
     */
    getMascaraTelefone(telefone: string): string {
        return telefone ? (telefone.length === 14 ? '(99)99999-9999' : '(99)9999-9999?9') : '(99)9999-9999?9';
    }


    /**
     * Coloca zeros a esquerda no valor até o tamanho passado por parâmetro
     * @param valor Valor a ser colocado zeros à esquerda
     * @param tamanho tamanho do número
     */
    zeroEsquerda(valor: string, tamanho: number) {
        if (valor) {
            const length = tamanho - valor.toString().length + 1;
            return Array(length).join('' || '0') + valor;
        }
    }
}
