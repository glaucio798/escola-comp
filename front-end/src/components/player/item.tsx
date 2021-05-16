import styles from "./item.module.scss";

type ItemPlayerProps = {
  nome: string;
  clicou: (id: string, nome: string) => void;
  id: string;
  ativo: boolean;
};

export function ItemPlayer({ nome, clicou, id, ativo }: ItemPlayerProps) {
  return (
    <div className={styles.row}>
      <button onClick={() => clicou(id, nome)} type="button">
        {!ativo ? (
          <img src="/play-green.svg" alt="Tocar" />
        ) : (
          <img src="/pause.svg" alt="Tocar" />
        )}
      </button>
      <div className={styles.col}>
        <p>{nome}</p>
      </div>
    </div>
  );
}
