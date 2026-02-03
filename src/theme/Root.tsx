import React from "react";
import {useLocation} from "@docusaurus/router";
import BrowserOnly from "@docusaurus/BrowserOnly";
import ReadingProgress from "./ReadingProgress";
import CookieConsent from "./CookieConsent";

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
      <BrowserOnly>
        {() => <CookieConsent />}
      </BrowserOnly>
    </>
  );
}
