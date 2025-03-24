import React from 'react';
import type { Props } from '@theme/Root';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function Root({ children }: Props): JSX.Element {
  return (
    <>
      {!ExecutionEnvironment.canUseDOM && (
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KD86KG"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
      )}
      {children}
    </>
  );
}
