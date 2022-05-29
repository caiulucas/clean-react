import React from 'react';

import { Footer, Logo } from '@presentation/components';

import styles from './styles.scss';

export function SurveyList() {
  return (
    <div className={styles.surveyListWrap}>
      <header>
        <div className={styles.headerContent}>
          <Logo />

          <div>
            <span>Caio Lucas</span>
            <a href="#">Sair</a>
          </div>
        </div>
      </header>
      <main>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div>
              <time>
                <span className={styles.day}>28</span>
                <span className={styles.month}>05</span>
                <span className={styles.year}>2022</span>
              </time>
              <p>Qual o seu framework web favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li>
            <div>
              <time>
                <span className={styles.day}>28</span>
                <span className={styles.month}>05</span>
                <span className={styles.year}>2022</span>
              </time>
              <p>Qual o seu framework web favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
          <li>
            <div>
              <time>
                <span className={styles.day}>28</span>
                <span className={styles.month}>05</span>
                <span className={styles.year}>2022</span>
              </time>
              <p>Qual o seu framework web favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
        </ul>
      </main>

      <Footer />
    </div>
  );
}
