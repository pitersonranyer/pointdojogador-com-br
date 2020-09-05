import { SelectItem } from 'primeng/primeng';
import { Injectable } from '@angular/core';

@Injectable()
export class SelectItemService {

    constructor() { }

    /**
     * @description Resgata as opções de sexo
     * @returns SelectItem[] sexo
     */
    getOpcoesSexo(): SelectItem[] {
        return [{ label: 'FEMININO', value: 'FEMININO' },
        { label: 'MASCULINO', value: 'MASCULINO' }];
    }

    /**
    * @description Resgata as opções de sim e não
    * @returns SelectItem[]
    */
    getOpcoesSimNao(): SelectItem[] {
        return [{ label: 'SIM', value: true },
        { label: 'NÃO', value: false }];
    }

    /**
     * @description Resgata opções de tipo de pessoa(Jurídica e Física)
     * @returns SelectItem[]
     */
    getOpcoesTipoPessoa(): SelectItem[] {
        return [
            { label: 'PESSOA FÍSICA', value: 1 },
            { label: 'PESSOA JURÍDICA', value: 2 }
        ];
    }

    /**
     * @description Resgata opções de tipo de bem para cadastro no sistema
     * @returns SelectItem[]
     */
    getOpcoesTipoBem(): SelectItem[] {
        return [
            { label: 'AUTOMÓVEL', value: 'AUTOMÓVEL' },
            { label: 'CASA', value: 'CASA' },
            { label: 'IATE', value: 'IATE' },
            { label: 'JETSKY', value: 'JETSKY' },
            { label: 'LANCHA', value: 'LANCHA' },
            { label: 'MOTOCICLETA', value: 'MOTOCICLETA' }
        ];
    }

    /**
    * @description Resgata todas as siglas das Unidades Federativas do Brasil
    * @returns SelectItem[]
    */
    getOpcoesUF(): SelectItem[] {
        return [{ value: null, label: 'Selecione' },
        { value: 'AC', label: 'AC' },
        { value: 'AL', label: 'AL' },
        { value: 'AP', label: 'AP' },
        { value: 'AM', label: 'AM' },
        { value: 'BA', label: 'BA' },
        { value: 'CE', label: 'CE' },
        { value: 'DF', label: 'DF' },
        { value: 'ES', label: 'ES' },
        { value: 'GO', label: 'GO' },
        { value: 'MA', label: 'MA' },
        { value: 'MT', label: 'MT' },
        { value: 'MS', label: 'MS' },
        { value: 'MG', label: 'MG' },
        { value: 'PA', label: 'PA' },
        { value: 'PB', label: 'PB' },
        { value: 'PR', label: 'PR' },
        { value: 'PE', label: 'PE' },
        { value: 'PI', label: 'PI' },
        { value: 'RJ', label: 'RJ' },
        { value: 'RN', label: 'RN' },
        { value: 'RS', label: 'RS' },
        { value: 'RO', label: 'RO' },
        { value: 'RR', label: 'RR' },
        { value: 'SC', label: 'SC' },
        { value: 'SP', label: 'SP' },
        { value: 'SE', label: 'SE' },
        { value: 'TO', label: 'TO' }];
    }

    /**
     * @description Retorna uma lista de SelectItems do tipo DificuldadeEnum
     */
    public getOpcoesDificuldade(): SelectItem[] {
        return [{ label: 'FÁCIL', value: 'FÁCIL', icon: 'fas fa-fw fa-grin' },
        { label: 'MÉDIO', value: 'MÉDIO', icon: 'fas fa-fw fa-smile' },
        { label: 'DIFÍCIL', value: 'DIFÍCIL', icon: 'fas fa-fw fa-meh' }];
    }

    /**
     * @description Retorna uma lista de SelectItems do tipo CategoriaExercicioEnum
     */
    public getOpcoesCategoriaExercicio(): SelectItem[] {
        return [
            { label: 'ABDÔMEN', value: 'ABDÔMEN' },
            { label: 'BICEPS', value: 'BICEPS' },
            { label: 'COSTAS', value: 'COSTAS' },
            { label: 'PANTURRILHA', value: 'PANTURRILHA' },
            { label: 'PEITORAL', value: 'PEITORAL' },
            { label: 'PERNAS', value: 'PERNAS' },
            { label: 'TRÍCEPS', value: 'TRÍCEPS' }];
    }

}
