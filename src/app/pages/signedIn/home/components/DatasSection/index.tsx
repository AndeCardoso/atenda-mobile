import React from "react";
import { Container, Values } from "./styles";
import { Text } from "@components/base/Text";
import { Row } from "@components/base/Row";
import { Chart } from "@components/base/Chart";
import { GetDatasInfoResponseDTO } from "@services/home/dtos/response/GetDatasInfoResponseDTO";

interface IDatasSectionProps {
  data: GetDatasInfoResponseDTO;
}

export const DatasSection = ({ data }: IDatasSectionProps) => {
  const { openedSo, executingSo, concludedSo, withdrawnSo, total } = data;

  return (
    <Container>
      <Row space="space-evenly">
        <Values>
          <Text color="WHITE" size={14} weight="700">
            Abertas
          </Text>
          <Chart totalValue={total} value={openedSo} />
        </Values>
        <Values>
          <Text color="WHITE" size={14} weight="700">
            Em execução
          </Text>
          <Chart totalValue={total} value={executingSo} />
        </Values>
        <Values>
          <Text color="WHITE" size={14} weight="700">
            Concluídas
          </Text>
          <Chart totalValue={total} value={concludedSo} />
        </Values>
        <Values>
          <Text color="WHITE" size={14} weight="700">
            Fechadas
          </Text>
          <Chart totalValue={total} value={withdrawnSo} />
        </Values>
      </Row>
    </Container>
  );
};
