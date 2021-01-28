import React from "react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme";
import { AddCategory } from "../../components/AddCategory";

describe("Pruebas en el componente AddCategory", () => {
  const setCategories = jest.fn();
  let wrapper = shallow(<AddCategory setCategories={setCategories} />);

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallow(<AddCategory setCategories={setCategories} />);
  });

  test("debe mostrar el componente correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe cambiar la caja de texto", () => {
    const input = wrapper.find("input");
    const value = "Hola Mundo";
    input.simulate("change", { target: { value } });
    const newValue = wrapper.find("input").prop("value").trim();
    expect(newValue).toBe(value);
  });

  test("No debe postear la información con submit", () => {
    wrapper.find("form").simulate("submit", { preventDefault() {} });
    expect(setCategories).not.toHaveBeenCalled();
  });

  test("debe llamar el setCategories y limpiar la caja de texto", () => {
    const value = "Texto a buscar";
    // 1. Simular el inputChange:
    wrapper.find("input").simulate("change", { target: { value } });
    // 2. Simular el submit:
    wrapper.find("form").simulate("submit", { preventDefault() {} });
    // 3. setCategories se debe haber llamado:
    expect(setCategories).toHaveBeenCalled();
    expect(setCategories).toHaveBeenCalledTimes(1);
    expect(setCategories).toHaveBeenCalledWith(expect.any(Function));
    // 4. El valor del input debe estar en ''
    expect(wrapper.find("input").prop("value")).toBe("");
  });
});
