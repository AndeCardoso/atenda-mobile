export interface GetCitiesResponseDTO {
  id: number;
  nome: string;
  microrregiao: {
    id: number;
    nome: string;
    mesorregiao: {
      id: number;
      nome: string;
      UF: {
        id: number;
        nome: string;
        sigla: string;
        regiao: {
          id: number;
          nome: string;
          sigla: string;
        };
      };
    };
  };
  "regiao-imediata": {
    id: number;
    nome: string;
    microrregiao: {
      id: number;
      nome: string;
      "regiao-intermediara": {
        id: number;
        nome: string;
        UF: {
          id: number;
          nome: string;
          sigla: string;
          regiao: {
            id: number;
            nome: string;
            sigla: string;
          };
        };
      };
    };
  };
}
