import { describe, expect, it } from "vitest";
import { range } from "./utils";

describe('first test testing', () => {
    it('should pass', () => {
        expect(true).toBe(true);
    })

    it('should pass', () => {
        expect(1).toEqual(1);
    })

    describe("range function", () => {
        it("should return an array of numbers from start to end", () => {
            const result = range(1, 5);
            expect(result).toEqual([1, 2, 3, 4]);
        })
    })
})