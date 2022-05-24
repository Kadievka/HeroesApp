import getHeroById from "../../helpers/utils/getHeroById";

describe("getHeroById unit tests", () => {
  it("should return undefned when nothing is passed", () => {
    expect(getHeroById()).toBe(undefined);
  });
});
