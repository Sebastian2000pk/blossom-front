import { expect } from "vitest";
import { Character } from "../../interfaces/character";

export const CHARACTERS_MOCK: Character = {
  name: "Rick Sanchez",
  species: "Human",
  status: "Alive",
  id: 1,
  gender: "Female",
  image: "http://test.png",
};

export const expectCharacter: Character = {
  name: expect.any(String),
  species: expect.any(String),
  status: expect.any(String),
  id: expect.any(Number),
  favorite: expect.any(Boolean),
  gender: expect.any(String),
  image: expect.any(String),
};
