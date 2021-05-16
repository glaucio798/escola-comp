import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import styles from "./item.module.scss";
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

type arquivo = {
  nome: string;
  arquivo: string;
};

type ArquivoProps = {
  arquivo: arquivo;
};

export function ItemArquivo({ arquivo }: ArquivoProps) {
  return (
    <Tooltip
      title={
        <p style={{ fontSize: "0.75rem", padding: "0" }}>{arquivo.nome}</p>
      }
      arrow
    >
      <div className={styles.item}>
        <a href={arquivo.arquivo} target="_blank">
          <FontAwesomeIcon className={styles.icon} icon={faFilePdf} />
          <p>{arquivo.nome}</p>
        </a>
      </div>
    </Tooltip>
  );
}
