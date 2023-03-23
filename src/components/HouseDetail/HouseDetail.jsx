import React from "react";
import { getHouse } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// CUIDADOOOO. SI O SI FUNCTIONAL COMPONENT! SE ROMPEN LOS TEST EN CASO CONTRARIO!!
// TAMBIEN VAS A TENER QUE USAR HOOKS!
const HouseDetail = () => {
  const dispatch = useDispatch();

  const house = useSelector((state) => state.house);

  const { houseId } = useParams(); //Recibimos por PARAMS el id ejm: house/1 siendo 1 el id de la casa
  React.useEffect(() => dispatch(getHouse(houseId)), []);

  return (
    <div>
      {house.description && ( //! Si tenemos house.description renderizamos el componente
        <>
          <h1>{house.name}</h1>
          <h2>${house.price}</h2>
          <p>{house.description.description}</p>
          <img src={house.description.imageUrl} />
        </>
      )}
    </div>
  );
};

export default HouseDetail;
