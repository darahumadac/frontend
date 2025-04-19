import { Outlet, useParams } from "react-router-dom";

export default function Browse() {
  const { entity, type } = useParams<string>();
  return (
    <>
      <h1>Browse {`${entity} ${type || ''}`.trimEnd()}</h1>
    </>
  );
}
