import React, { useCallback, useState } from "react";
import {
  Canvas,
  Path,
  SkPath,
  Skia,
  TouchInfo,
  useTouchHandler,
} from "@shopify/react-native-skia";
import { useTheme } from "styled-components";
import { View } from "react-native";
import { Toolbar } from "./Toolbar";
import { LabelLine } from "./LabelLine";

interface ISignatureCanva {
  sigantureOwner: string;
}

export const SignatureCanva = ({ sigantureOwner }: ISignatureCanva) => {
  const { colors } = useTheme();
  const [paths, setPaths] = useState<SkPath[]>([]);

  const onSignatureStart = useCallback((touchInfo: TouchInfo) => {
    setPaths((old) => {
      const { x, y } = touchInfo;
      const newPath = Skia.Path.Make();
      newPath.moveTo(x, y);
      return [...old, newPath];
    });
  }, []);

  const onSignatureActive = useCallback((touchInfo: TouchInfo) => {
    setPaths((currentPaths) => {
      const { x, y } = touchInfo;
      const currentPath = currentPaths[currentPaths.length - 1];
      const lastPoint = currentPath.getLastPt();
      const xMid = (lastPoint.x + x) / 2;
      const yMid = (lastPoint.y + y) / 2;

      currentPath.quadTo(lastPoint.x, lastPoint.y, xMid, yMid);
      return [...currentPaths.slice(0, currentPaths.length - 1), currentPath];
    });
  }, []);

  const touchHandler = useTouchHandler(
    {
      onActive: onSignatureActive,
      onStart: onSignatureStart,
    },
    [onSignatureActive, onSignatureStart]
  );

  const handleCleanAll = () => {
    setPaths([]);
  };

  const handleUndo = () => {
    if (paths.length > 1) {
      const newPathValues = paths.pop();
      setPaths(newPathValues);
    } else {
      handleCleanAll();
    }
  };

  return (
    <View style={{ flex: 1, width: "100%", backgroundColor: colors.SECONDARY }}>
      <Toolbar onClearAll={handleCleanAll} onUndo={handleUndo} />

      <Canvas
        style={{
          flex: 1,
          backgroundColor: colors.SECONDARY,
        }}
        onTouch={touchHandler}
      >
        <LabelLine text={sigantureOwner} />
        {paths.map((path, index) => (
          <Path
            key={index}
            path={path}
            color={colors.PRIMARY}
            style={"stroke"}
            strokeWidth={3}
          />
        ))}
      </Canvas>
    </View>
  );
};
