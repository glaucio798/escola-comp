import styles from "./lista.module.scss";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ItemLista } from "./item";

type Playlist = {
  nome: string;
  aulas: string[];
  _id: string;
};

type ListaProps = {
  categoria: String;
  play: Playlist[];
};

export function Lista({ categoria, play }: ListaProps) {
  const [search, setSearch] = useState("");
  const [items, setitems] = useState(play);

  useEffect(() => {
    setitems(play);
  }, [play]);

  useEffect(() => {
    setSearch("");
    setFiltrado(items);
  }, [categoria]);

  useEffect(() => {
    setFiltrado(
      items.filter((item) => {
        return item.nome.toLowerCase().includes(search);
      })
    );
  }, [items]);

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
    playlists.push(
      <ItemLista
        to={filtrado[i]._id}
        categoria={categoria}
        key={i}
        nome={filtrado[i].nome}
        aulas={filtrado[i].aulas.length}
      />
    );

  return (
    <div className={styles.lista}>
      <header>
        <p>{categoria}</p>
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
