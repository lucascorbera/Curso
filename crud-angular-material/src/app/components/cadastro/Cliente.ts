import { v4 as uuid } from 'uuid';

export class Cliente {
  id?: string;
  nome?: string;
  email?: string;
  cpf?: string;
  dataNascimento?: Date;

  constructor(id?: string, nome?: string, email?: string, cpf?: string, dataNascimento?: Date) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
  }

  static newCliente() {
    const cliente = new Cliente();
    cliente.id = uuid();
    return cliente;
  }
}
