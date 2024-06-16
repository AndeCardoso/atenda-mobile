import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import ReanimatedCarousel from "react-native-reanimated-carousel";
import { Bullet, BulletsContainer, Container } from "./styles";

interface ICarouselProps<T> {
  data: Array<T>;
  height: number;
  renderComponent: (item: T, index: number) => JSX.Element;
}

const { width } = Dimensions.get("window");

export const Carousel = <T extends unknown>({
  data,
  height,
  renderComponent,
}: ICarouselProps<T>) => {
  const [activeItem, setActiveItem] = useState(0);

  const cardWidth = width * 0.95;
  const spacerWidth = (width - cardWidth) / 2;

  return (
    <Container>
      <ReanimatedCarousel
        data={data}
        vertical={false}
        loop={false}
        pagingEnabled={true}
        height={height}
        width={width}
        scrollAnimationDuration={500}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.98,
          parallaxScrollingOffset: 25,
        }}
        style={{ marginHorizontal: cardWidth }}
        renderItem={({ item, index }) => (
          <View style={{ paddingHorizontal: 10 }}>
            {renderComponent(item, index)}
          </View>
        )}
        onSnapToItem={(index) => {
          setActiveItem(index);
        }}
      />

      {data && data.length > 1 && (
        <BulletsContainer>
          {data.map((_, index) => (
            <Bullet key={index} active={index === activeItem} />
          ))}
        </BulletsContainer>
      )}
    </Container>
  );
};
