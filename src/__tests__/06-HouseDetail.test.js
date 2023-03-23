import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter } from "react-router-dom";
import * as ReactRedux from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import isReact from "is-react";

import HouseDetail from "../components/HouseDetail/HouseDetail";
import * as data from "../../db.json";
import * as actions from "../redux/actions";

configure({ adapter: new Adapter() });
//! Test ok
describe("<HouseDetail />", () => {
  let houseDetail, useSelectorStub, useSelectorFn, useEffect;
  const noCharactersHouse = {
    id: 5,
    name: "House NoHouse",
    region: "The dessert",
    price: "",
  };

  const match = (id) => ({
    params: { houseId: id },
    isExact: true,
    path: "/houses/:houseId",
    url: `/houses/${id}`,
  });
  const mockStore = configureStore([thunk]);

  const store = (id) => {
    let state = {
      houses: data.houses.concat(noCharactersHouse),
      house:
        id !== 5 ? data.houses[id - 1] : data.houses.concat(noCharactersHouse),
    };
    return mockStore(state);
  };
  // Si o si vas a tener que usar functional component! No van a correr ninguno de los tests si no lo haces!
  // También fijate que vas a tener que usar algunos hooks. Tanto de React como de Redux!
  // Los hooks de React si o si los tenes que usar "React.useState", "React.useEffect". El test no los reconoce
  // cuando se hace destructuring de estos métodos === test no corren.
  beforeAll(() => expect(isReact.classComponent(HouseDetail)).toBeFalsy());
  const mockUseEffect = () => useEffect.mockImplementation((fn) => fn());

  beforeEach(() => {
    useSelectorStub = jest.spyOn(ReactRedux, "useSelector");
    useSelectorFn = (id) =>
      useSelectorStub.mockReturnValue(store(id).getState().house);
    useEffect = jest.spyOn(React, "useEffect");
    houseDetail = (id) =>
      mount(
        <ReactRedux.Provider store={store(id)}>
          <MemoryRouter initialEntries={[`/houses/${id}`]}>
            <HouseDetail match={match(id)} />
          </MemoryRouter>
        </ReactRedux.Provider>
      );
    mockUseEffect();
    mockUseEffect();
  });

  afterEach(() => jest.restoreAllMocks());

  it("Debería usar un useEffect y dentro de este, dispachar la acción getHouse, pasandole como argumento el ID de la house a renderizar", () => {
    // Nuevamente testeamos todo el proceso. Tenes que usar un useEffect, y despachar la acción "getHouse".
    const useDispatch = jest.spyOn(ReactRedux, "useDispatch");
    const getHouse = jest.spyOn(actions, "getHouse");
    houseDetail(1);
    expect(useEffect).toHaveBeenCalled();
    expect(useDispatch).toHaveBeenCalled();
    expect(getHouse).toHaveBeenCalled();
  });

  it('Debería recibir por props el objeto "match". Utilizar el "houseId" de "params" para despachar la action "getHouse" y renderizar los detalles de la house', () => {
    const house = data.houses[0];
    // Fijate que para traerte los datos desde Redux, vas a tener que usar el hook de Redux "useSelector"
    // para que los tests pasen!
    // Lo que se esta testeando aca, es que el componente renderice los detalles del todo correctamente,
    // no la estructura del componente asi que eres libre de diseñar la estructura, siempre y cuando se muestren los datos del todo.
    // Verificar la llegada de datos en el objeto "match.params", puede romper en el caso que no exista nada.
    useSelectorFn(1);
    expect(houseDetail(1).text().includes(house.name)).toEqual(true);
    expect(houseDetail(1).text().includes(house.price)).toEqual(true);
    expect(useSelectorStub).toHaveBeenCalled();
    expect(useEffect).toHaveBeenCalled();
  });



});
