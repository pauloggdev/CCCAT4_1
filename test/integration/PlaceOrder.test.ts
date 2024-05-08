import PlaceOrder from "../../src/application/usecase/place_order/PlaceOrder";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter";
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";

let placeOrder: PlaceOrder;
let orderRepository: OrderRepository;
beforeEach(() => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  const itemRepository = new ItemRepositoryDatabase(connection);
  orderRepository = new OrderRepositoryDatabase(connection);
  const couponRepository = new CouponRepositoryDatabase(connection);
  placeOrder = new PlaceOrder(
    itemRepository,
    orderRepository,
    couponRepository
  );
});
test("Deve fazer um pedido", async function () {
  const input = {
    cpf: "839.435.452-10",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    date: new Date("2021-12-10"),
    coupon: "VALE20",
  };
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(138);
});
test("Deve fazer um pedido com calculo do frete", async function () {
  const input = {
    cpf: "839.435.452-10",
    orderItems: [
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ],
    date: new Date("2021-12-10"),
  };
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(6650);
});
test("Deve fazer um pedido com código", async function () {
  const input = {
    cpf: "839.435.452-10",
    orderItems: [
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ],
    date: new Date("2021-12-10"),
  };
  const output = await placeOrder.execute(input);
  expect(output.code).toBe("202100000001");
});

afterEach(async () => {
  await orderRepository.clear();
});
