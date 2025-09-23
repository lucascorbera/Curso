import { v4 as uuid } from 'uuid';

export class Cliente {
    id?: string = '';
    nome?: string = '';
    email?: string = '';
    cpf?: string = '';
    dataNascimento?: Date = new Date();
    municipio?: string = '';
    estado?: string = '';
    cep?: string = '';
    endereco?: string = '';
    constructor(
        id?: string,
        nome?: string,
        email?: string,
        cpf?: string,
        dataNascimento?: Date,
        municipio?: string,
        estado?: string,
        cep?: string,
        endereco?: string
    ) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.municipio = municipio;
        this.estado = estado;
        this.cep = cep;
        this.endereco = endereco;
    }

    static newCliente() {
        const cliente = new Cliente();
        return cliente;
    }

    gerarNovoId() {
        this.id = uuid();
    }
}
