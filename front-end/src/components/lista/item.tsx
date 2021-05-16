import Link from "next/link";
import styles from "./item.module.scss";

type ItemListaProps = {
  nome: String;
  categoria: String;
  aulas: number;
  to: string;
};

export function ItemLista({ nome, aulas, categoria, to }: ItemListaProps) {
  return (
    <div className={styles.row}>
      <Link shallow={false} href={`${categoria}/${to}`}>
        <a>
          <button type="button">
            <img src="/play-green.svg" alt="Tocar" />
          </button>
        </a>
      </Link>
      <div className={styles.col}>
        <h4>{nome}</h4>
        <p>{aulas} aula(s)</p>
      </div>
    </div>
  );
}
