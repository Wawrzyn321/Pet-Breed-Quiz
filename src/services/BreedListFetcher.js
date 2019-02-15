import { fetchTimeout } from "../utility/utility";

export default class BreedListFetcher {
  async fetchData() {
    const apiGuyCatsPromise = this.fetchCatList();
    const ceoCatsPromise = this.fetchDogList();

    const promises = [apiGuyCatsPromise, ceoCatsPromise];
    return Promise.all(promises);
  }

  async fetchCatList() {
    const endpointUrl = "https://api.thecatapi.com/v1/breeds";

    const headers = new Headers();
    headers.append("x-api-key", "c8501f27-8e89-4982-bbce-f295dd4e1e56");
    const initObject = {
      method: "GET",
      headers: headers
    };
    const response = await fetchTimeout(endpointUrl, initObject, 4000);
    const jsonBreeds = await response.json();
    return BreedListFetcher.transformCatBreedList(jsonBreeds);
  }

  async fetchDogList() {
    const endpointUrl = "https://dog.ceo/api/breeds/list/all";

    const headers = new Headers();
    // headers.append('x-api-key', 'c8501f27-8e89-4982-bbce-f295dd4e1e56');
    const initObject = {
      method: "GET",
      headers: headers
    };

    const response = await fetchTimeout(endpointUrl, initObject, 4000);
    const json = await response.json();
    return BreedListFetcher.transformDogBreedList(json.message);
  }

  static transformCatBreedList(breeds) {
    return breeds.map(elem => {
      return {
        displayName: elem.name,
        linkName: elem.id
      };
    });
  }

  static transformDogBreedList(breeds) {
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
    return BreedListFetcher.fixDogNames(transformedData);
  }

  // add spaces in some dog names, so the don't overflow answer boxes
  static fixDogNames(breeds) {
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
