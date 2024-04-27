export class ProdutoEntity {
  public id: string;
  public nome: string;
  public valor: number;
  public quantidadeDisponivel: number;
  public descricao: string;
  public caracteristicas: Caracteristica[];
  public imagens: Imagem[];
  public categoria: string;
  public usuarioId: string;
}

type Caracteristica = {
  nome: string;
  descricao: string;
};

type Imagem = {
  url: string;
  descricao: string;
};
