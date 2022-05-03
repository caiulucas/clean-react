import { memo } from 'react';

import styles from './styles.scss';

function FooterBase() {
  return <footer className={styles.footer} />;
}

export const Footer = memo(FooterBase);
