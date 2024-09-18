class FavoriteService {
  favorites: string[] = [];
  getFavorites(): string[] {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      this.favorites = JSON.parse(favorites);
    }
    return this.favorites;
  }

  addFavorite(id: number): void {
    if (!this.favorites.includes(id.toString())) {
      this.favorites.push(id.toString());
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    }
  }

  removeFavorite(id: number): void {
    this.favorites = this.favorites.filter(
      (favorite) => favorite !== id.toString()
    );
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }
}

export const favoriteService = new FavoriteService();
