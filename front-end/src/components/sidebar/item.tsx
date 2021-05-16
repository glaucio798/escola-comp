import { faScroll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./item.module.scss";
import Link from "next/link";

type itemSideProps = {
  text: String;
  active: boolean;
  to: string;
};

export function ItemSide({ text, active, to }: itemSideProps) {
  return (
    <Link shallow={false} href={to}>
      <a>
        <div className={styles.item + " " + (active ? styles.active : "")}>
          <FontAwesomeIcon icon={faScroll} color="white" />
          <p>{text}</p>
        </div>
      </a>
    </Link>
  );
}
