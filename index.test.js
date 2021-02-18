describe("Proxy", () => {
  it("should intercept a method calling", () => {
    expect.assertions(2);

    const oldCar = { color: "blue", model: 2012 };
    const monitoring = {
      actions: jest.fn(),
    };

    const newCar = new Proxy(oldCar, {
      set(_t, _p, receiver) {
        monitoring.actions(receiver);
        Reflect.set(...arguments);
      },
    });

    const currentYear = new Date().getFullYear();
    newCar.model = new Date().getFullYear();

    expect(monitoring.actions).toHaveBeenCalledTimes(1);
    expect(monitoring.actions).toHaveBeenCalledWith(currentYear);
  });
});
