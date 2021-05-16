import styles from "./video.module.scss";
import YouTube from "react-youtube";

type VideoPlayerProps = {
  id: string;
};

export function VideoPlayer({ id }: VideoPlayerProps) {
  return (
    <div className={styles.row}>
      <YouTube
        videoId={id}
        opts={{
          height: "300",
          width: "100%",
          playerVars: {
            autoplay: 1,
          },
        }}
      />
    </div>
  );
}
