import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import isReact from "is-react";

import * as data from "../../db.json";
import CreateHouse from "../components/CreateHouse/CreateHouse";
import * as actions from "../redux/actions";

configure({ adapter: new Adapter() });

describe("<CreateHouse />", () => {
  const state = { houses: data.houses };
  const mockStore = configureStore([thunk]);
  const { CREATE_HOUSE } = actions;

  beforeAll(() => expect(isReact.classComponent(CreateHouse)).toBeFalsy());

  // Si o si vas a tener que usar functional component! No van a correr ninguno de los tests si no lo haces!
  // También fijate que vas a tener que usar algunos hooks. Tanto de React como de Redux!
  // Los hooks de React si o si los tenes que usar "React.useState", "React.useEffect". El test no los reconoce
  // cuando se hace destructuring de estos métodos === test no corren.
  describe("Estructura", () => {
    let createHouse;
    let store = mockStore(state);
    beforeEach(() => {
      createHouse = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/characters/create"]}>
            <CreateHouse />
          </MemoryRouter>
        </Provider>
      );
    });

    it("Debería renderizar un form", () => {
      expect(createHouse.find("form")).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "Name: "', () => {
      expect(createHouse.find("label").at(0).text()).toEqual("Name: ");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "name"', () => {
      expect(createHouse.find('input[name="name"]')).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "Region: "', () => {
      expect(createHouse.find("label").at(1).text()).toEqual("Region: ");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "region"', () => {
      expect(createHouse.find('input[name="region"]')).toHaveLength(1);
    });

    it('Debería renderizar un label con el texto "price: "', () => {
      expect(createHouse.find("label").at(2).text()).toEqual("price: ");
    });

    it('Debería renderizar un input con la propiedad "name" igual a "price"', () => {
      expect(createHouse.find('input[name="price"]')).toHaveLength(1);
    });

    it('Debería renderizar un button con "type" igual a "submit" y con texto "Create"', () => {
      expect(createHouse.find('button[type="submit"]')).toHaveLength(1);
      expect(createHouse.find("button").at(0).text()).toEqual("Create");
    });
  });

  describe("Manejo de estados", () => {
    let useState, useStateSpy, createHouse;
    let store = mockStore(state);
    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((values) => [values, useState]);
      createHouse = mount(
        <Provider store={store}>
          <CreateHouse />
        </Provider>
      );
    });

    it("Debería setear correctamente los valores del estado inicial del componente", () => {
      expect(useStateSpy).toHaveBeenCalledWith({
        name: "",
        region: "",
        price: "",
      });
    });

    describe("Name input", () => {
      it('Debería cambiar de estado cuando cambie el valor del input "name', () => {
        createHouse.find('input[name="name"]').simulate("change", {
          target: { name: "name", value: "House test 07" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "House test 07",
          region: "",
          price: "",
        });
      });
    });

    describe("Region input", () => {
      it('Debería cambiar de estado cuando cambie el valor del input "region', () => {
        createHouse.find('input[name="region"]').simulate("change", {
          target: { name: "region", value: "Falsa region 07" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          region: "Falsa region 07",
          price: "",
        });
      });
    });

    describe("price input", () => {
      it('Debería cambiar de estado cuando cambie el valor del input "price', () => {
        createHouse.find('input[name="price"]').simulate("change", {
          target: { name: "price", value: "1234" },
        });
        expect(useState).toHaveBeenCalledWith({
          name: "",
          region: "",
          price: "1234",
        });
      });
    });
  });

  describe("Dispatch to store", () => {
    let createHouse, useState, useStateSpy;
    let store = mockStore(state);

    beforeEach(() => {
      useState = jest.fn();
      useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((values) => [values, useState]);
      store = mockStore(state, actions.createHouseAction);
      store.clearActions();
      createHouse = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/characters/create"]}>
            <CreateHouse />
          </MemoryRouter>
        </Provider>
      );
    });

    afterEach(() => jest.restoreAllMocks());

    it('Debería hacer un dispatch al store utilizando la action "createHouse" con los datos del state cuando se hace un "submit"', () => {
      // Acá deberías usar el hook de Redux "useDispatch" también!
      const createHouseFn = jest.spyOn(actions, "createHouse");
      createHouse
        .find('[type="submit"]')
        .simulate("submit", { preventDefault() {} });
      const expectedAction = [
        {
          payload: {
            name: "",
            region: "",
            price: "",
            id: 4,
          },
          type: CREATE_HOUSE,
        },
      ];
      expect(store.getActions()).toEqual(expectedAction);
      expect(CreateHouse.toString().includes("useDispatch")).toBeTruthy();
      expect(createHouseFn).toHaveBeenCalled();
    });

    it('Debería llamar al evento "preventDefault" para evitar que se refresque la página luego de hacer un submit', () => {
      const event = { preventDefault: () => {} };
      jest.spyOn(event, "preventDefault");
      createHouse.find("form").simulate("submit", event);
      expect(event.preventDefault).toBeCalled();
    });
  });
});
