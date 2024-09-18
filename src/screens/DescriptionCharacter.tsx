import { useParams } from "react-router-dom";
import { useCharacter } from "../hooks/useCharacter";

export const DescriptionCharacter = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useCharacter(id!);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <picture>
        <img src={data?.image} />
      </picture>

      <h2>{data?.name}</h2>

      <ul>
        <li>
          <h4>Specie</h4>
          <p>{data?.species}</p>
        </li>
        <li>
          <h4>Status</h4>
          <p>{data?.status}</p>
        </li>
        <li>
          <h4>gender</h4>
          <p>{data?.gender}</p>
        </li>
      </ul>
    </div>
  );
};
