import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

export default function Home(): JSX.Element {
  const history = useHistory();

  useEffect(() => {
    history.push('/docs/intro'); // Update the path to match your site's structure
  }, [history]);

  return null;
}

