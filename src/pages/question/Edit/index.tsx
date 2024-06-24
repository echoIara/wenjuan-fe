import React, { FC } from "react";
import useLoadQuesData from "../../../hooks/useLoadQuesData";

const Edit: FC = () => {

  const { loading, data } = useLoadQuesData()

  return (
    <div>
      <p>Edit page</p>
      {loading ? <p>loading</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  )
};

export default Edit;
