import { Card } from "@components/base/Card";
import { IconButton } from "@components/base/IconButton";
import { Row } from "@components/base/Row";
import { Text } from "@components/base/Text";
import { IAddressForm } from "@components/forms/AddressForm/formSchema";
import React from "react";

interface IAddressListItem {
  index: number;
  data: Partial<IAddressForm>;
  isEditing: boolean;
  handleEditAddressByIndex: (value: number) => void;
  handleDecreaseAddressByIndex: (value: number) => void;
}

export const AddressListItem = ({
  data,
  index,
  isEditing,
  handleEditAddressByIndex,
  handleDecreaseAddressByIndex,
}: IAddressListItem) => {
  return (
    <Card>
      <Row space="space-between">
        <Text color="BLACK" size={16} weight="600">
          {data.nickname}
        </Text>
        <Row widthType="auto" gap={4}>
          <IconButton
            name="file-edit"
            onPress={() => handleEditAddressByIndex(index)}
          />
          {isEditing ? (
            <>
              <Text size={18}>|</Text>
              <IconButton
                name="close-box"
                onPress={() => handleDecreaseAddressByIndex(index)}
              />
            </>
          ) : null}
        </Row>
      </Row>
    </Card>
  );
};
