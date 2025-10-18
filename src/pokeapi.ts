import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    #cache: Cache;
  
    constructor(cacheInterval: number) {
      this.#cache = new Cache(cacheInterval);
    }
    closeCache() {
      this.#cache.stopReapLoop();
    }

    async fetchWithCache<T>(URL: string): Promise<T> {
      const cached = this.#cache.get<T>(URL);
      if (cached) return cached;
      try {
          const response = await fetch(URL);
          if (!response.ok) {
              throw new Error(`${response.status} ${response.statusText}`);
          }
          const json: T = await response.json();
          this.#cache.add<T>(URL, json);
          return json;
      } catch (error) {
          throw new Error(`Error fetching locations: ${(error as Error).message}`);
      }
    }
  
    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
      pageURL = pageURL ?? `${PokeAPI.baseURL}/location-area`;
      const json = await this.fetchWithCache<ShallowLocations>(pageURL);
      return json;
    }
    
  
    async fetchLocation(locationName: string): Promise<Location> {
      const pageURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
      const json = await this.fetchWithCache<Location>(pageURL);
      return json;
    };

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
      const pageURL = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
      const json = await this.fetchWithCache<Pokemon>(pageURL);
      return json;
    };
  };
  
  export type ShallowLocations = {
    count: number,
    next: string | null,
    previous: string | null,
    results: {
      name: string,
      url: string,
    }[]
  };

  
  export type Location = {
    encounter_method_rates: any[]
    game_index: number
    id: number
    location: Location
    name: string
    names: any[]
    pokemon_encounters: any[]
  };

  export type Pokemon = {
    abilities: any[],
    base_experience: number,
    cries: any,
    forms: any[],
    game_indices: any[],
    height: number,
    held_items: any[],
    id: number,
    is_default: boolean,
    location_area_encounters: string,
    moves: any[],
    name: string,
    order: number,
    past_abilities: any[],
    past_types: any[],
    species: any,
    sprites: any,
    stats: any[],
    types: any[],
    weight: number,
  };