import { fetchTimeout } from "../utility/utility";
import BreedListProvider from "./base/BreedListProvider";

export default class BreedListFetcher extends BreedListProvider {
  async fetchData() {
    const apiGuyCatsPromise = this.fetchCatList();
    const ceoCatsPromise = this.fetchDogList();

    const promises = [apiGuyCatsPromise, ceoCatsPromise];
    return Promise.all(promises);
  }

  async fetchCatList() {
    const endpointUrl = "https://api.thecatapi.com/v1/breeds";

    const headers = new Headers();
    const initObject = {
      method: "GET",
      headers: headers
    };
    const response = await fetchTimeout(endpointUrl, initObject, 4000);
    const jsonBreeds = await response.json();
    return this.transformCatBreedList(jsonBreeds);
  }

  async fetchDogList() {
    const endpointUrl = "https://dog.ceo/api/breeds/list/all";

    const headers = new Headers();
    const initObject = {
      method: "GET",
      headers: headers
    };

    const response = await fetchTimeout(endpointUrl, initObject, 4000);
    const json = await response.json();
    return this.transformDogBreedList(json.message);
  }

  transformCatBreedList(breeds) {
    return breeds.map(elem => {
      return {
        displayName: elem.name,
        linkName: elem.id
      };
    });
  }

  transformDogBreedList(breeds) {
    const transformedData = [];
    for (const breed in breeds) {
      if (breeds[breed].length === 0) {
        transformedData.push({
          displayName: breed,
          linkName: breed
        });
      } else {
        for (const subBreed of breeds[breed]) {
          transformedData.push({
            displayName: subBreed + " " + breed,
            linkName: breed + "-" + subBreed
          });
        }
      }
    }
    return this.fixDogNames(transformedData);
  }

  // add spaces in some dog names, so the don't overflow answer boxes
  fixDogNames(breeds) {
    const breedNamesToFix = [
      {
        name: "germanlonghair pointer",
        fixedName: "german longhair pointer"
      },
      {
        name: "mexicanhairless",
        fixedName: "mexican hairless"
      },
      {
        name: "germanshepherd",
        fixedName: "german shepherd"
      },
      {
        name: "newfoundland",
        fixedName: "new foundland"
      }
    ];

    for (let i = 0; i < breeds.length; i++) {
      for (let j = 0; j < breedNamesToFix.length; j++) {
        if (breeds[i].displayName === breedNamesToFix[j].name) {
          breeds[i].displayName = breedNamesToFix[j].fixedName;
          break;
        }
      }
    }
    return breeds;
  }
}
