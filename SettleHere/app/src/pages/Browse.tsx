import { useParams } from "react-router-dom";

export default function Browse() {
  const { entity, tag, type } = useParams<string>();
  return (
    <>
      <h1>Browse {`${entity} ${tag || ''} ${type || "all"}`.trimEnd()}</h1>
    </>
  );
}
