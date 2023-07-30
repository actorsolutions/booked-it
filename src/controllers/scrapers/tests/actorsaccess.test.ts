import { auditionScraper } from "../actorsaccess";
import { mockHTML } from "@/controllers/auditions/tests/mockHTML";

describe("Actor Access Scraper Tools tests", async () => {
  it("Should return an array of audition objects", () => {
    const expected: any = [];
    const auditions = auditionScraper(mockHTML);
    expect(auditions).toEqual(expected);
  });
});
