import { vi, beforeEach, afterEach } from "vitest";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { fireEvent } from "@testing-library/react";
import { CharacterList } from "../screens/CharacterList";

// Hooks
import { useCharacters } from "../hooks/useCharacters";

// Mocks
vi.mock("../hooks/useCharacters", () => ({
  useCharacters: vi.fn(),
}));

describe("character Filter", () => {
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

  it("filters characters correctly", () => {
    render(
      <MemoryRouter>
        <CharacterList />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("filter-button"));

    // Select a filter option
    const statusOption = screen.getByText("Alive");
    fireEvent.click(statusOption);

    // Check if the filters are applied
    expect(useCharacters).toHaveBeenCalledWith({
      species: "All",
      status: "Alive",
      name: "",
      gender: "All",
    });
  });
});
