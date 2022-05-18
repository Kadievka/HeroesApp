import heroes from "../../data/heroes";
import Hero from "../../interfaces/Heroe";

export default function getHeroByID(id: string): Hero | undefined {
  return heroes.find((hero) => hero.id === id);
}
