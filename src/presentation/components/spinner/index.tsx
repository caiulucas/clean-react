import styles from './styles.scss';

type Props = React.HTMLAttributes<HTMLElement>;

export function Spinner({ className }: Props) {
  return (
    <div className={[styles.spinner, className].join(' ')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
