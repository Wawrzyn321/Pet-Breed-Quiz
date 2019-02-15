import { Categories, Creatures, AnswerState } from "./utility/enums";
import BreedListFetcher from "./services/BreedListFetcher";
import {
  getRandomElements,
  getShuffledArray,
  getRandomNumber
} from "./utility/utility";

export default class QuizCreator {
  static async create(category, questionsCount, answersCount) {
    switch (category) {
      case Categories.Cats:
        await QuizCreator.initializeRequiredBreedLists(category);
        return QuizCreator.createQuiz(
          QuizCreator.catBreedList,
          questionsCount,
          answersCount,
          Creatures.Cat
        );
      case Categories.Dogs:
        await QuizCreator.initializeRequiredBreedLists(category);
        return QuizCreator.createQuiz(
          QuizCreator.dogBreedList,
          questionsCount,
          answersCount,
          Creatures.Dog
        );
      case Categories.Both:
        await QuizCreator.initializeRequiredBreedLists(category);
        return QuizCreator.createCompositeQuiz(
          [QuizCreator.catBreedList, QuizCreator.dogBreedList],
          questionsCount,
          answersCount,
          [Creatures.Cat, Creatures.Dog]
        );
      default:
        throw Error("Unknown quiz type!: " + category);
    }
  }

  static async initializeRequiredBreedLists(category) {
    //check if list is not already loaded
    const breedsToFetch = [];
    if (category === Categories.Cats || category === Categories.Both) {
      if (QuizCreator.catBreedList === null) {
        breedsToFetch.push(QuizCreator.initializeCatList());
      }
    }
    if (category === Categories.Dogs || category === Categories.Both) {
      if (QuizCreator.dogBreedList === null) {
        breedsToFetch.push(QuizCreator.initializeDogList());
      }
    }
    return Promise.all(breedsToFetch);
  }

  static async initializeCatList() {
    const fetcher = new BreedListFetcher();
    const list = await fetcher.fetchCatList();
    QuizCreator.catBreedList = list;
  }

  static async initializeDogList() {
    const fetcher = new BreedListFetcher();
    const list = await fetcher.fetchDogList();
    QuizCreator.dogBreedList = list;
  }

  static createQuiz(breedList, questionCount, answerCount, creatureType) {
    const breeds = getRandomElements(breedList, questionCount);

    const questions = breeds.map(correctBreed => {
      const answerBreeds = getRandomElements(breedList, answerCount)
        .filter(otherBreed => {
          // filter breed equal to correctBreed
          return otherBreed.displayName !== correctBreed.displayName;
        })
        .splice(0, answerCount - 1); // restrict length if no breed has been removed

      const answerIndex = getRandomNumber(answerCount);
      answerBreeds.splice(answerIndex, 0, correctBreed);

      answerBreeds.forEach(answerBreed => {
        answerBreed.state = AnswerState.None;
      });

      return {
        answers: answerBreeds,
        type: creatureType,
        answerIndex: answerIndex
      };
    });

    return getShuffledArray(questions);
  }

  static createCompositeQuiz(
    breedLists,
    questionCount,
    answerCount,
    creatureTypes
  ) {
    const questions = [];
    for (let i = 0; i < questionCount; i++) {
      const creatureTypeIndex = getRandomNumber(breedLists.length);
      const answerBreeds = getRandomElements(
        breedLists[creatureTypeIndex],
        answerCount
      );
      const answerIndex = getRandomNumber(answerCount);

      answerBreeds.forEach(answerBreed => {
        answerBreed.state = AnswerState.None;
      });

      questions.push({
        answers: answerBreeds,
        type: creatureTypes[creatureTypeIndex],
        answerIndex: answerIndex
      });
    }
    return questions;
  }
}

QuizCreator.catBreedList = null;
QuizCreator.dogBreedList = null;
