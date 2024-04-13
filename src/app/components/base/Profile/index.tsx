import React from "react";
import { Conatiner, IconWrapper } from "./styles";
import { Text } from "../Text";
import { Icon } from "../Icon";
import { IUserData } from "@contexts/auth/useAuthContext";

interface IProfileProps {
  data: IUserData;
}

export const Profile = ({ data: { name, admin } }: IProfileProps) => {
  return (
    <Conatiner>
      <IconWrapper>
        <Icon name={admin ? "account-cog" : "account"} />
      </IconWrapper>
      <Text>{name}</Text>
    </Conatiner>
  );
};
