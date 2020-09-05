export class UsuarioEntity {
    login: string;
    senha: string;
    acesso?: string[];

    ativo: boolean;
    atualizarSenha: boolean;
}
