import { PublisherEnum } from "../../enum/PublisherEnum";

export default interface Hero {
  id: string;
  superhero: string;
  publisher: PublisherEnum | string;
  alter_ego: string;
  first_appearance: string;
  characters: string;
}
