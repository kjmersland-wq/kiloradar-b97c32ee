import { describe, it, expect } from "vitest";
import { shrinkflation, unitPrice } from "./kilo-data";
describe("kilo math", () => {
  it("unit price per kg", () => expect(unitPrice(45, 180, "g")).toBeCloseTo(250));
  it("shrinkflation same price smaller pack", () => expect(shrinkflation(40, 200, 40, 180)).toBeCloseTo(11.11, 1));
});
