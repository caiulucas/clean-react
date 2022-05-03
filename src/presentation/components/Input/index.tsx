import styles from './styles.scss';

type Props = React.FormHTMLAttributes<HTMLInputElement> & {
  type: string;
};

export function Input(props: Props) {
  return (
    <div className={styles.inputWrap}>
      <input {...props} />
      <span>🔴</span>
    </div>
  );
}
