import { Creatures } from "../utility/enums";
import { fetchTimeout } from "../utility/utility";

export default class ImageFetcher {
  static async fetchPicture(breedLinkName, type) {
    switch (type) {
      case Creatures.Dog:
        return ImageFetcher.fetchDogPictureUrl(breedLinkName);
      case Creatures.Cat:
        return ImageFetcher.fetchCatPictureUrl(breedLinkName);
      default:
        throw Error("Unknown creature type!: " + type);
    }
  }

  static async fetchDogPictureUrl(dogBreedLinkName) {
    const endpoint = ImageFetcher.getDogPictureEndpoint(dogBreedLinkName);

    const response = await fetchTimeout(endpoint, {}, 4000);
    const json = await response.json();
    return json.message;
  }

  static async fetchCatPictureUrl(catBreedLinkName) {
    const endpoint = ImageFetcher.getCatPictureEndpoint(catBreedLinkName);

    const response = await fetchTimeout(endpoint, {}, 4000);
    const json = await response.json();
    return json[0].url;
  }

  static getCatPictureEndpoint(catBreedLinkName) {
    return (
      "https://api.thecatapi.com/v1/images/search?size=full&mime_types=jpg,png&format=json&order=RANDOMlimit=1&category_ids&" +
      catBreedLinkName
    );
  }

  static getDogPictureEndpoint(dogBreedLinkName) {
    return `https://dog.ceo/api/breed/${dogBreedLinkName}/images/random`;
  }
}
