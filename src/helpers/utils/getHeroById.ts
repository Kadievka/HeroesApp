import heroes from "../../data/heroes";
import Hero from "../../interfaces/Hero";

export default function getHeroById(id?: string): Hero | undefined {
  return id ? heroes.find((h) => h.id === id) : undefined;
}
