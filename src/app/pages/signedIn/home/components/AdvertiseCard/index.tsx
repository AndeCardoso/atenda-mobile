import { images } from "@assets/index";
import { Card } from "@components/base/Card";
import { Row } from "@components/base/Row";
import { Text } from "@components/base/Text";
import React from "react";
import { Image, View, ViewStyle } from "react-native";

interface IAdvertiseCardProps {
  message: string;
}

export const AdvertiseCard = ({ message }: IAdvertiseCardProps) => {
  const styles: ViewStyle = {
    marginHorizontal: 16,
  };
  return (
    <Card color="SECONDARY_INACTIVE" style={styles}>
      <Row>
        <Image
          source={images.icon}
          resizeMode="stretch"
          style={{
            width: 50,
            height: 50,
          }}
        />
        <View>
          <Text weight="600" size={24} color="WHITE">
            Sistema Atenda
          </Text>
          <Text weight="600" size={20} color="WHITE">
            Informa
          </Text>
        </View>
      </Row>
      <Text weight="600" size={18} color="WHITE">
        {message}
      </Text>
    </Card>
  );
};
