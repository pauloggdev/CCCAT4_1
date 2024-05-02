import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";

export default class ItemRepositoryMemory implements ItemRepository {
  items: Item[];
  constructor() {
    this.items = [
      new Item(1, "Música", "CD", 30),
      new Item(2, "Video", "DVD", 50),
      new Item(3, "Video", "VHS", 10),
    ];
  }
  findById(idItem: number): Promise<Item | undefined> {
    return Promise.resolve(this.items.find((item) => item.idItem === idItem));
  }
}
