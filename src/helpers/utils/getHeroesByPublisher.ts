import heroes from "../../data/heroes";
import { PublisherEnum } from "../../enum/PublisherEnum";
import Hero from "../../interfaces/components/Hero";

export default function getHeroesByPublisher(publisher: PublisherEnum): Hero[] {
  return heroes.filter((hero) => hero.publisher === publisher);
}
