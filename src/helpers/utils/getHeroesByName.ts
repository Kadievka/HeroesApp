import heroes from "../../data/heroes";
import Hero from "../../interfaces/components/Hero";

export default function getHeroesByName(name: string): Hero[] {
  if (!name) return [];
  name = name?.toLowerCase();
  return heroes.filter((hero) => hero.superhero.toLowerCase().includes(name as string));
}
