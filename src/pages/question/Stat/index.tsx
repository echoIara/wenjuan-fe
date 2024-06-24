import React, { FC } from "react";
import useLoadQuesData from "../../../hooks/useLoadQuesData";

const Stat: FC = () => {

  const { loading, data } = useLoadQuesData()

  return (
    <div>
      <p>Stat page</p>
      {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  )
};

export default Stat;
