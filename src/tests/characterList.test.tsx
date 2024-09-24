import { vi, beforeEach, afterEach } from "vitest";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CharacterList } from "../screens/CharacterList";

// Hooks
import { useCharacters } from "../hooks/useCharacters";

// Mocks
vi.mock("../hooks/useCharacters", () => ({
  useCharacters: vi.fn(),
}));

describe("characterList", () => {
  const mockAddToFavorites = vi.fn();
  const mockRemoveFromFavorites = vi.fn();

  beforeEach(() => {
    (useCharacters as jest.Mock).mockReturnValue({
      characters: [
        { id: 1, name: "Rick Sanchez", favorite: false },
        { id: 2, name: "Morty Smith", favorite: true },
      ],
      addToFavorites: mockAddToFavorites,
      removeFromFavorites: mockRemoveFromFavorites,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("renders list of characters", () => {
    render(
      <MemoryRouter>
        <CharacterList />
      </MemoryRouter>
    );

    const mortyElements = screen.getAllByText(/Morty Smith/i);
    expect(mortyElements.length).toBeGreaterThan(1);

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
  });

  test("renders favorites correctly", () => {
    render(
      <MemoryRouter>
        <CharacterList />
      </MemoryRouter>
    );

    // Check if favorites are rendered
    expect(screen.getByText("Starred Characters (1)")).toBeInTheDocument();
  });
});
