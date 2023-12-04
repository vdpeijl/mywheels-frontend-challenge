import { FC, PropsWithChildren } from "react";

const RootLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <html>
      <body className="test">{children}</body>
    </html>
  );
};

export default RootLayout;
