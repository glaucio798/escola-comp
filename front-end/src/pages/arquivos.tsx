import styles from "../styles/app.module.scss";
import { Sidebar } from "../components/sidebar";
import { Arquivo } from "../components/arquivos";
import { GetStaticProps } from "next";
import { api } from "../services/api";

function categoria({ arquivos }) {
  return (
    <div className={styles.app}>
      <div className={styles.sidebar}>
        <Sidebar categoria="arquivos" />
      </div>
      <main>
        <Arquivo arquivos={arquivos} />
      </main>
    </div>
  );
}

export default categoria;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("/arquivo");

  const arquivos = data;

  return {
    props: { arquivos },
    revalidate: 43200,
  };
};
