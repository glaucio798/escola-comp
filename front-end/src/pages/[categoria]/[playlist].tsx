import styles from "../../styles/app.module.scss";
import { Sidebar } from "../../components/sidebar";
import { Player } from "../../components/player";
import { api } from "../../services/api";
import { GetStaticPaths, GetStaticProps } from "next";

function playlist({ items, categoria, nome }) {
  return (
    <div className={styles.app}>
      <div className={styles.sidebar}>
        <Sidebar categoria={categoria} />
      </div>
      <main>
        <Player aulas={items} nome={nome} categoria={categoria} />
      </main>
    </div>
  );
}

export default playlist;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get(`/categoria`);
  const paths = [];
  data.map((categoria) => {
    categoria.playlists.map((play) => {
      paths.push({ params: { categoria: categoria.nome, playlist: play } });
    });
  });

  console.log(paths);

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { categoria, playlist } = ctx.params;

  const { data } = await api.get(`/playlist/${playlist}`);

  const items = data.aulas;
  const nome = data.nome;

  return {
    props: { items, categoria, nome },
    revalidate: 86400,
  };
};
