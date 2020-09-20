import React from "react";
import { Text as TextImpl } from "drei/abstractions/Text";

const interRegular =
  "https://rsms.me/inter/font-files/Inter-Regular.woff?v=3.11";
const interBold = "https://rsms.me/inter/font-files/Inter-Bold.woff?v=3.11";

{
  /* https://github.com/protectwise/troika/tree/master/packages/troika-three-text */
}

export default function Text({
  bold = false,
  anchorX = 0,
  anchorY = 0,
  textAlign = "center",
  ...props
}) {
  return (
    <TextImpl
      color="white"
      anchorX={anchorX}
      anchorY={anchorY}
      textAlign={textAlign}
      font={bold ? interBold : interRegular}
      {...props}
    />
  );
}
