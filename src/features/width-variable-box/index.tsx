import * as React from "react";

import Box from "@mui/material/Box";

const getBoxWidth = (defaultWidth: number) => {
  if (typeof window === "undefined") return defaultWidth;
  const widthStr = window.localStorage.getItem("width");
  if (widthStr === null) return defaultWidth;
  const width = window.parseInt(widthStr, 10);
  return window.isNaN(width) ? defaultWidth : width;
};

const WidthVariableBox: React.FC = ({ children }) => {
  const boxRef = React.useRef<HTMLDivElement>(null);

  const [startClientX, setStartClientX] = React.useState(0);
  const [startWidth, setStartWidth] = React.useState(0);

  const handleMouseMove = (event: MouseEvent) => {
    const offset = event.clientX - startClientX;
    if (boxRef.current) {
      boxRef.current.style.width = `${Math.max(startWidth + offset, 160)}px`;
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    if (boxRef.current) {
      window.localStorage.setItem("width", String(boxRef.current.offsetWidth));
    }
  };

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const { clientX } = event;
    setStartClientX(clientX);
    if (boxRef.current) {
      setStartWidth(boxRef.current.offsetWidth);
    }
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <Box
        ref={boxRef}
        sx={{
          position: "relative",
          width: getBoxWidth(460),
          height: "100%",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            position: "absolute",
            width: 10,
          },
          "&::-webkit-scrollbar-track": {
            position: "absolute",
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            position: "absolute",
            backgroundColor: "white",
            borderRadius: 5,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "pink",
            borderRadius: 5,
          },
          "&::-webkit-scrollbar-thumb:active": {
            backgroundColor: "green",
            borderRadius: 5,
          },
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          width: 3,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? theme.palette.primary[900]
              : theme.palette.grey[500],
          cursor: "e-resize",
        }}
        onMouseDown={handleMouseDown}
      />
    </>
  );
};

export default WidthVariableBox;