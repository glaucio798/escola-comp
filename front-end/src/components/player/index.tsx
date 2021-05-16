import styles from "./player.module.scss";
import { ItemPlayer } from "./item";
import { VideoPlayer } from "./video";
import { useEffect, useState } from "react";

type aulas = {
  nome: string;
  link: string;
};

type PlayerProps = {
  categoria: String;
  nome: string;
  aulas: aulas[];
};

export function Player({ categoria, nome, aulas }: PlayerProps) {
  const [videoid, setVideoid] = useState(aulas[0]?.link);
  const [nomeAula, setNomeAula] = useState(aulas[0]?.nome);

  const items = [];
  for (let i = 0; i < aulas.length; i++)
    items.push(
      <ItemPlayer
        key={i}
        nome={aulas[i].nome}
        clicou={(id: string, nome: string) => {
          setVideoid(id);
          setNomeAula(nome);
        }}
        id={aulas[i].link}
        ativo={videoid == aulas[i].link}
      />
    );

  useEffect(() => {
    setVideoid(aulas[0]?.link);
    setNomeAula(aulas[0]?.nome);
  }, [aulas]);

  return (
    <div className={styles.lista}>
      <header>
        <p>{categoria}</p>
        <div className={styles.input}>
          <p>{nome}</p>
        </div>
      </header>
      <div className={styles.corpo}>
        <p>{nomeAula}</p>
        <div className={styles.frame}>
          <div className={styles.video}>
            <VideoPlayer id={videoid} />
          </div>
          <div className={styles.aulas}>{items}</div>
        </div>
      </div>
    </div>
  );
}
