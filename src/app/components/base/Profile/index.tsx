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
        <Icon name={admin ? "account-cog" : "account"} />
      </IconWrapper>
      <NamesWrapper>
        <Text>{companyName}</Text>
        <Text size={12}>{name}</Text>
      </NamesWrapper>
    </Conatiner>
  );
};
