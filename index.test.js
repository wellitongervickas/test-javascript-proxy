describe("Proxy", () => {
  it("should intercept action when model has been changed", () => {
    expect.assertions(2);

    const currentYear = new Date().getFullYear();
    const oldCar = { color: "blue", model: 2012 };
    const monitoring = {
      actions: jest.fn(),
    };

    const newCar = new Proxy(oldCar, {
      set(_t, prop, receiver) {
        monitoring.actions(prop, receiver);
        Reflect.set(...arguments);
      },
    });

    newCar.model = currentYear;

    expect(monitoring.actions).toHaveBeenCalledTimes(1);
    expect(monitoring.actions).toHaveBeenCalledWith("model", currentYear);
  });
});
