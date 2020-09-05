import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MensageriaService } from './mensageria.service';

/**
 * @author Felipe Lima
 * @description Serviço criado para centralizar tratamento de datas
 */
@Injectable()
export class DataHoraService {

    constructor(private mensageriaService: MensageriaService) { }

    /**
     * @description Gera data a partir de uma string formato dd/mm/yyyy
     * @param data Data a ser gerada
     * @returns Date
     */
    gerarData(data: string): Date {
        const dataLocal: any[] = data.split('/');
        return new Date(dataLocal[2], dataLocal[1] - 1, dataLocal[0], 1 /*corrige horario de verão*/);
    }

    /**
     * @description Verifica se o campoData passado por parâmetro possui uma menor que a data de hoje
     * @param campoData Campo do formulário que contenha data formato dd/mm/yyyy
     * @param descricaoCampo Descrição do campo para ser apresentado na mensagem em caso de erro
     * @returns boolean true(data menor que hoje), false(data maior que hoje e apresenta mensagem em tela)
     */
    validarDataFormMenorQueHoje(campoData: FormGroup, descricaoCampo: string): boolean {
        if (this.gerarData(campoData.value) > new Date()) {
            campoData.setErrors({ 'Data inválida': true });
            campoData.markAsDirty();
            this.mensageriaService.setMensagemAlerta(true, true, descricaoCampo + ' não pode ser maior que hoje.');
            return false;
        }
        return true;
    }

    /**
     * @description Verifica se o campoData passado por parâmetro possui uma data válida
     * @param campoData Campo do formulário que contenha data formato dd/mm/yyyy
     * @param descricaoCampo Descrição do campo para ser apresentado na mensagem em caso de erro
     * @param mostraMensagem true(mostra mensagem de erro na tela), false(não mostra mensagem de erro na tela)
     * @returns boolean true(data válida), false(data inválida e apresenta mensagem em tela se parâmetro 'mostraMensagem' for true)
     */
    validarData(campoData: FormGroup, descricaoCampo: string, mostraMensagem: boolean) {
        /* CONCEITO DA VALIDAÇÃO: se após converter o valor para o tipo Data
           e após a conversão a data ainda for a mesma, quer dizer que a conversão
           foi um sucesso, então sabemos que a data é válida */

        const data = campoData.value;
        const dia = data.substring(0, 2);
        const mes = data.substring(3, 5);
        const ano = data.substring(6, 10);

        // Criando um objeto Date usando os valores ano, mes e dia.
        const novaData: Date = new Date(ano, (mes - 1), dia);

        const mesmoDia = (parseInt(dia, 10) === novaData.getDate());
        const mesmoMes = (parseInt(mes, 10) === novaData.getMonth() + 1);
        const mesmoAno = (parseInt(ano, 10) === novaData.getFullYear());

        if (!(mesmoDia && mesmoMes && mesmoAno)) {
            campoData.setErrors({ 'Data inválida': true });
            campoData.markAsDirty();
            if (mostraMensagem) {
                this.mensageriaService.setMensagemAlerta(true, true, descricaoCampo + ' não é uma data válida.');
            }
            return false;
        }
        return true;

    }

    /**
     * @description Verifica se o campoHora passado por parâmetro possui um horário válido
     * @param campoHora Campo do formulário que contenha horário no formato HH:mm
     * @param descricaoCampo Descrição do campo para ser apresentado na mensagem em caso de erro
     * @returns boolean true(horário válido), false(horário válido e apresenta mensagem em tela)
     */
    validarHorario(campoHora: AbstractControl, descricaoCampo: string): boolean {
        const campo: FormGroup = <FormGroup>campoHora;
        if (campo.value !== null) {
            const hora = (campo.value.substring(0, 2));
            const minuto = (campo.value.substring(3, 5));
            if (hora < 0 || hora > 24) {
                campo.setErrors({ 'Horário inválido': true });
                campo.markAsDirty();
                this.mensageriaService.setMensagemAlerta(true, true, descricaoCampo + ' não é um horário válido.');
                return false;
            }
            if (minuto < 0 || minuto > 60) {
                campo.setErrors({ 'Horário inválido': true });
                campo.markAsDirty();
                this.mensageriaService.setMensagemAlerta(true, true, descricaoCampo + ' não é um horário válido.');
                return false;
            }
        }
        return true;
    }

    /**
     * @description Formatar data formato dd/mm/yyyy
     * @param data Data formato yyyy-mm-dd
     */
    formatarData(data): string {
        if (data === null || data === '' || data === undefined) {
            return data;
        }
        const dt = data.toString().substr(0, 10).split('-');
        return [dt[2], dt[1], dt[0]].join('/');
    }

     /**
     * @description Retorna apenas a data de um Date
     * @param data Data tipo Date
     */
    separarData(data: any): string {
        if (data instanceof Date) {
            data = data.toLocaleString('pt-BR');
            return data.substr(0, 10);
        } else {
            return data;
        }
    }

    /**
     * @description Retorna apenas as horas de uma data
     * @param data Data tipo Date
     */
    separarHora(data: any): string {
        if (data instanceof Date) {
            data = data.toLocaleString('pt-BR');
            return data.substr(11, 8);
        } else {
            return data;
        }
    }

    /**
     * @description cria data de acordo com as strings passadas por parâmentros
     * @param hora hora tipo HH:MM
     * @param data data formato dd/mm/yyyy
     * @returns Date
     */
    montarHoraData(hora: string, data: string): Date {
        const horaLocal: any[] = hora.split(':');
        const dataHora = this.gerarData(data);
        dataHora.setMinutes(horaLocal[1]);
        dataHora.setHours(horaLocal[0]);
        return dataHora;
    }
}
