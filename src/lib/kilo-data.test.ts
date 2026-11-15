import { describe, it, expect } from "vitest";
import { shrinkflation, unitPrice } from "./kilo-data";
describe("kilo math", () => {
  it("unit price per kg", () => expect(unitPrice(45, 180, "g")).toBeCloseTo(250));
  it("shrinkflation same price smaller pack", () => expect(shrinkflation(40, 200, 40, 180)).toBeCloseTo(11.11, 1));
});
import { basketFor } from "./kilo-data";
describe("household basket", () => {
  it("family of 4 is base price", () => expect(basketFor(1000, 4)).toBe(1000));
  it("single person pays 40%", () => expect(basketFor(1000, 1)).toBe(400));
});
