import styles from "../styles/app.module.scss";
import { Sidebar } from "../components/sidebar";
import { Lista } from "../components/lista";
import { api } from "../services/api";
import { GetStaticPaths, GetStaticProps } from "next";

function categoria({ items, categoria }) {
  return (
    <div className={styles.app}>
      <div className={styles.sidebar}>
        <Sidebar categoria={categoria} />
      </div>
      <main>
        <Lista categoria={categoria} play={items} />
      </main>
    </div>
  );
}

export default categoria;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get(`/categoria`);

  const paths = data.map((categoria) => ({
    params: { categoria: categoria.nome },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { categoria } = ctx.params;

  const { data } = await api.get(`/categoria/${categoria}`);

  const items = data.playlists;

  return {
    props: { items, categoria },
    revalidate: 86400,
  };
};
