import styles from "./arquivo.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import { ItemArquivo } from "./item";

type arquivo = {
  nome: string;
  arquivo: string;
};

type ArquivoProps = {
  arquivos: arquivo[];
};

export function Arquivo({ arquivos }: ArquivoProps) {
  const [search, setSearch] = useState("");
  const [items, setitems] = useState(arquivos);

  useEffect(() => {
    setitems(arquivos);
  }, [arquivos]);

  useEffect(() => {
    setFiltrado(
      arquivos.filter((item) => {
        return item.nome.toLowerCase().includes(search);
      })
    );
  }, [arquivos]);

  const handleChange = (event) => {
    setSearch(event.target.value);
    setFiltrado(
      items.filter((item) => {
        return item.nome.toLowerCase().includes(event.target.value);
      })
    );
  };

  const [filtrado, setFiltrado] = useState(items);

  const playlists = [];
  for (let i = 0; i < filtrado.length; i++)
    playlists.push(<ItemArquivo key={i} arquivo={filtrado[i]} />);

  return (
    <div className={styles.lista}>
      <header>
        <p>Arquivos</p>
        <div className={styles.input}>
          <TextField
            id="standard-password-input"
            label="Pesquisar"
            type="text"
            value={search}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faSearch} color="gray" />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </header>
      <div className={styles.corpo}>{playlists}</div>
    </div>
  );
}
