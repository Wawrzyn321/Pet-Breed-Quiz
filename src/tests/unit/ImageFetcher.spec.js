import ImageFetcher from "@/services/ImageFetcher";

describe("ImageFetcher", () => {
  it("throws error or invalid Creature Type value", async () => {
    const fetcher = new ImageFetcher();
    const breedLinkName = "unknown";
    const invalidType = "unknown";

    try {
      await fetcher.fetchPicture(breedLinkName, invalidType);
    } catch (e) {
      expect(e.message).toMatch(/Unknown creature type!: /);
    }
  });
});
