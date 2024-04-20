import { Divider } from "@components/base/Separator";
import { Spacer } from "@components/base/Spacer";
import { Text } from "@components/base/Text";
import React from "react";

export const AddressHeader = () => {
  return (
    <>
      <Divider spaceVertical={16} />
      <Text size={16} color="WHITE">
        Endereço
      </Text>
      <Divider spaceVertical={16} />
      <Spacer spaceVertical={16} />
    </>
  );
};
