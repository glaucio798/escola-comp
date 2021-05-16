import styles from "./sidebar.module.scss";
import { ItemSide } from "./item";

type SidebarProps = {
  categoria: String;
};

export function Sidebar({ categoria }: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/logo.svg" alt="Logo comp" />
      </div>
      <div className={styles.corpo}>
        <ItemSide
          to="/frontend"
          text="FrontEnd"
          active={categoria == "frontend"}
        />
        <ItemSide
          to="/backend"
          text="BackEnd"
          active={categoria == "backend"}
        />
        <ItemSide to="/po" text="PO" active={categoria == "po"} />
        <ItemSide to="/design" text="Design" active={categoria == "design"} />
        <ItemSide
          to="/capacitacoes"
          text="Capacitações"
          active={categoria == "capacitacoes"}
        />
        <ItemSide
          to="/techshots"
          text="TechShots"
          active={categoria == "techshots"}
        />
        <ItemSide
          to="/arquivos"
          text="Arquivos"
          active={categoria == "arquivos"}
        />
      </div>
      <div className={styles.spacer}></div>
      <div className={styles.footer}>
        <img src="/logo-completa.svg" alt="" />
      </div>
    </div>
  );
}
