const { compose } = require("ramda");

describe("Proxy", () => {
  it("should intercept action when model year has been changed", () => {
    expect.assertions(2);

    const details = { modelYear: 2011 };
    const currentYear = new Date().getFullYear();
    const monitoring = jest.fn((v) => v ?? {});

    const car = new Proxy(details, {
      set: compose(Reflect.set, monitoring),
    });

    car.modelYear = currentYear;

    expect(monitoring).toHaveBeenCalledTimes(1);
    expect(monitoring).toHaveBeenCalledWith(
      details,
      "modelYear",
      currentYear,
      details
    );
  });
});
