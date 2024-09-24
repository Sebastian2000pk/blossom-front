import { renderHook } from "@testing-library/react-hooks";
import { vi } from "vitest";
import { act } from "@testing-library/react-hooks";
import { describe, it, expect, afterEach } from "vitest";
import { client } from "../../graphql/apolloClient";
import { useCharacters } from "../../hooks/useCharacters";

// Services
import { favoriteService } from "../../services/favoriteService";

// Mocks
import { CHARACTERS_MOCK } from "../mocks/characters";
import { expectCharacter } from "../mocks/characters";

vi.mock("../../graphql/apolloClient", () => ({
  client: {
    query: vi.fn(),
  },
}));

vi.mock("../../services/favoriteService", () => ({
  favoriteService: {
    getFavorites: vi.fn(),
    addFavorite: vi.fn(),
    removeFavorite: vi.fn(),
  },
}));

describe("fetchCharactersHook", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should fetch characters", async () => {
    const species = "All";
    const status = "All";
    const gender = "All";
    const name = "";

    (client.query as jest.Mock).mockResolvedValue({
      data: {
        characters: [CHARACTERS_MOCK],
      },
    });

    (favoriteService.getFavorites as jest.Mock).mockReturnValue([1]);

    const { result, waitForNextUpdate } = renderHook(() =>
      useCharacters({ species, status, gender, name })
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.characters).toEqual([]);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.characters).toEqual([expectCharacter]);
  });

  it("should handle errors during fetch", async () => {
    // Simular un error en la consulta
    (client.query as jest.Mock).mockRejectedValue(new Error("Network Error"));

    const { result, waitForNextUpdate } = renderHook(() =>
      useCharacters({ species: "", status: "", gender: "", name: "" })
    );

    // Esperar la actualización del estado después de la consulta fallida
    await waitForNextUpdate();

    // Verificar que el error se maneja correctamente
    expect(result.current.error).toBe("Network Error");
    expect(result.current.loading).toBe(false);
    expect(result.current.characters).toEqual([]);
  });

  it("should add character to favorites", async () => {
    (favoriteService.getFavorites as jest.Mock).mockReturnValue([]);

    (client.query as jest.Mock).mockResolvedValue({
      data: {
        characters: [CHARACTERS_MOCK],
      },
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useCharacters({ species: "", status: "", gender: "", name: "" })
    );

    await waitForNextUpdate();

    // Simular la adición a favoritos
    act(() => {
      result.current.addToFavorites(1);
    });

    expect(favoriteService.addFavorite).toHaveBeenCalledWith(1);
    expect(result.current.characters[0].favorite).toBe(true);
  });

  it("should remove character from favorites", async () => {
    (favoriteService.getFavorites as jest.Mock).mockReturnValue([1]);
    (client.query as jest.Mock).mockResolvedValue({
      data: {
        characters: [CHARACTERS_MOCK],
      },
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useCharacters({ species: "", status: "", gender: "", name: "" })
    );
    
    await waitForNextUpdate();
    
    // Simular la eliminación de favoritos
    act(() => {
      result.current.removeFromFavorites(1);
    });

    expect(favoriteService.removeFavorite).toHaveBeenCalledWith(1);
    expect(result.current.characters[0].favorite).toBe(false);
  });
});
