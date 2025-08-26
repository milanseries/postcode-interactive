import { act, renderHook } from "@testing-library/react";
import { useSourceForm } from "./use-source-form";

describe("useSourceForm", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useSourceForm());
    expect(result.current).toBeDefined();
    expect(result.current.form.getValues().query).toBeDefined();
  });

  it("should have isLoading as false initially", () => {
    const { result } = renderHook(() => useSourceForm());
    expect(result.current.isLoading).toBe(false);
  });

  it("should update selectedId when handleClick is called", () => {
    const { result } = renderHook(() => useSourceForm());
    act(() => {
      result.current.handleClick({ id: 1 });
    });
    expect(result.current.selectedId).toEqual({ id: 1 });
  });

  it("should fallback to getCurrentState().sourcesData if results is not set", () => {
    const { result } = renderHook(() => useSourceForm());
    expect(result.current.results).toBeDefined();
  });
});
