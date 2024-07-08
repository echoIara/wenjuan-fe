import React, { FC } from "react";
import useLoadQuesData from "../../../hooks/useLoadQuesData";
import styles from "./index.module.scss";

const Edit: FC = () => {

  const { loading, data } = useLoadQuesData()

  return (
    <div className={styles.container}>
      <div>Header</div>
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>Left</div>
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}>
              <div style={{ height: '900px' }}>画布，测试滚动</div>
            </div>
          </div>
          <div className={styles.right}>Right</div>
        </div>
      </div>
    </div>
  )
};

export default Edit;
