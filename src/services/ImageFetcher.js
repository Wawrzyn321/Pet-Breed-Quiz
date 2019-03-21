import { Creatures } from "../utility/enums";
import { fetchTimeout } from "../utility/utility";
import ImageProvider from "./base/ImageProvider";

export default class ImageFetcher extends ImageProvider {
  async fetchPicture(breedLinkName, type) {
    switch (type) {
      case Creatures.Dog:
        return this.fetchDogPictureUrl(breedLinkName);
      case Creatures.Cat:
        return this.fetchCatPictureUrl(breedLinkName);
      default:
        throw Error("Unknown creature type!: " + type);
    }
  }

  async fetchDogPictureUrl(dogBreedLinkName) {
    const endpoint = this.getDogPictureEndpoint(dogBreedLinkName);

    const response = await fetchTimeout(endpoint, {}, 4000);
    const json = await response.json();
    return json.message;
  }

  async fetchCatPictureUrl(catBreedLinkName) {
    const endpoint = this.getCatPictureEndpoint(catBreedLinkName);

    const response = await fetchTimeout(endpoint, {}, 4000);
    const json = await response.json();
    return json[0].url;
  }

  getCatPictureEndpoint(catBreedLinkName) {
    return (
      "https://api.thecatapi.com/v1/images/search?size=full&mime_types=jpg,png&format=json&order=RANDOMlimit=1&category_ids&" +
      catBreedLinkName
    );
  }

  getDogPictureEndpoint(dogBreedLinkName) {
    return `https://dog.ceo/api/breed/${dogBreedLinkName}/images/random`;
  }
}
