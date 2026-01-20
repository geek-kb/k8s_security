import React from "react";
import {useLocation} from "@docusaurus/router";
import ReadingProgress from "./ReadingProgress";

interface Props {
  children: React.ReactNode;
}

export default function Root({children}: Props): JSX.Element {
  const location = useLocation();
  const isDocPage = location.pathname.startsWith("/docs/");

  return (
    <>
      {isDocPage && <ReadingProgress />}
      {children}
    </>
  );
}
