import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

export default function Home(): JSX.Element {
  const history = useHistory();

  useEffect(() => {
    history.push('/k8s_security/docs/intro'); // Update the path to match your site's structure
  }, [history]);

  return null;
}

