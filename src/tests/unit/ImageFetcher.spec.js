import ImageFetcher from "@/services/ImageFetcher";
describe("ImageFetcher", () => {
  it("throws error or invalid Creature Type value", async () => {
    const breedLinkName = "unknown";
    const invalidType = "unknown";

    try {
      await ImageFetcher.fetchPicture(breedLinkName, invalidType);
    } catch (e) {
      expect(e.message).toMatch(/Unknown creature type!: /);
    }
  });

  it("creates valid cat image endpoint", () => {
    const catEndpoint = ImageFetcher.getCatPictureEndpoint("cat");

    expect(catEndpoint).toBe(
      "https://api.thecatapi.com/v1/images/search?size=full&mime_types=jpg,png&format=json&order=RANDOMlimit=1&category_ids&cat"
    );
  });

  it("creates valid dog image endpoint", () => {
    const dogEndpoint = ImageFetcher.getDogPictureEndpoint("dog");

    expect(dogEndpoint).toBe("https://dog.ceo/api/breed/dog/images/random");
  });
});
