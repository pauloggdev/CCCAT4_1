import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";

export default class ItemRepositoryMemory implements ItemRepository {
  items: Item[];
  constructor() {
    this.items = [
      new Item(1, "Música", "CD", 30),
      new Item(2, "Video", "DVD", 50),
      new Item(3, "Video", "VHS", 10),
      new Item(4, "Instrumentos Musicais","Guitarra", 1000, 100, 30, 10, 3),
      new Item(5, "Instrumentos Musicais","Amplificador", 5000, 100, 50, 50, 20),
      new Item(6, "Acessórios","Cabo", 30, 10, 10, 10, 0.9),
    ];
  }
  findById(idItem: number): Promise<Item | undefined> {
    return Promise.resolve(this.items.find((item) => item.idItem === idItem));
  }
}
