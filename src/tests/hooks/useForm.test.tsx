import { act, renderHook } from "@testing-library/react";
import { useForm } from "../../hooks/useForm";

describe("Test useCounter hook", () => {
  it("should return a empty object if nothing happens", () => {
    const useFormHookResult = renderHook(() => useForm());

    const [values, handleInputChange, resetAllValues] = useFormHookResult.result.current;

    expect(values).toStrictEqual({});
    expect(typeof handleInputChange).toBe("function");
    expect(typeof resetAllValues).toBe("function");
  });

  it("should set an initial form", () => {
    const mockFormValues = {
      description: "",
      title: "My title",
      age: 20,
    };

    const useFormHookResult = renderHook(() => useForm(mockFormValues));

    const [values] = useFormHookResult.result.current;

    expect(values).toStrictEqual(mockFormValues);
  });

  it("should change one input and keep others ok and then reset the form to initial state", () => {
    const mockFormValues = {
      description: "",
      title: "My title",
      age: 20,
    };

    const useFormHookResult = renderHook(() => useForm(mockFormValues));

    const [_values, handleInputChange, resetAllValues] = useFormHookResult.result.current;

    act(() =>
      handleInputChange({
        target: {
          name: "description",
          value: "some description value",
        },
      }),
    );

    expect(useFormHookResult.result.current[0]).toStrictEqual({ ...mockFormValues, description: "some description value" });

    act(() => resetAllValues());

    expect(useFormHookResult.result.current[0]).toStrictEqual(mockFormValues);
  });
});
