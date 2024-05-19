import React, { RefObject, useCallback, useEffect, useState } from "react";
import {
  Path,
  SkPath,
  Skia,
  SkiaDomView,
  TouchInfo,
  useTouchHandler,
} from "@shopify/react-native-skia";
import { useTheme } from "styled-components";
import { Toolbar } from "./Toolbar";
import { LabelLine } from "./LabelLine";
import { Container, StyledCanvas } from "./styles";

interface ISignatureCanva {
  sigantureOwner: string;
  signatureRef?: RefObject<SkiaDomView>;
  onDirty?: (value: boolean) => void;
}

export const SignatureCanva = ({
  sigantureOwner,
  signatureRef,
  onDirty,
}: ISignatureCanva) => {
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
      setPaths(paths.slice(0, -1));
    } else {
      handleCleanAll();
    }
  };

  useEffect(() => {
    onDirty && onDirty(paths.length > 0);
  }, [paths]);

  return (
    <Container>
      <Toolbar onClearAll={handleCleanAll} onUndo={handleUndo} />
      <LabelLine text={sigantureOwner} />
      <StyledCanvas onTouch={touchHandler} ref={signatureRef}>
        {paths.map((path, index) => (
          <Path
            key={index}
            path={path}
            color={colors.PRIMARY}
            style={"stroke"}
            strokeWidth={3}
          />
        ))}
      </StyledCanvas>
    </Container>
  );
};
