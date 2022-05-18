import heroes from "../../data/heroes";
import Hero from "../../interfaces/Hero";

export default function getHeroesByName(name = ""): Hero[] {
  name = name.toLowerCase();
  return heroes.filter((hero) => hero.superhero.toLowerCase().includes(name));
}
