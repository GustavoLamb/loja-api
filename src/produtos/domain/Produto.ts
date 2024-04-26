export class Produto {
  public id: string;
  public nome: string;
  public valor: number;
  public quantidadeDisponivel: number;
  public descricao: string;
  public caracteristicas: Caracteristicas[];
  public imagens: Imagens[];
  public categoria: string;
  public usuarioId: string;
}

type Caracteristicas = {
  nome: string;
  descricao: string;
};

type Imagens = {
  url: string;
  descricao: string;
};
