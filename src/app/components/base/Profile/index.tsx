import React from "react";
import { Conatiner, IconWrapper, NamesWrapper } from "./styles";
import { Text } from "../Text";
import { Icon } from "../Icon";
import { IUserData } from "@contexts/auth/useAuthContext";

interface IProfileProps {
  data: IUserData;
}

export const Profile = ({
  data: { companyName, name, admin },
}: IProfileProps) => {
  return (
    <Conatiner>
      <IconWrapper>
        <Icon name={admin ? "account-cog" : "account"} color="SECONDARY" />
      </IconWrapper>
      <NamesWrapper>
        <Text color="SECONDARY">{companyName}</Text>
        <Text size={12} color="SECONDARY">
          {name}
        </Text>
      </NamesWrapper>
    </Conatiner>
  );
};
