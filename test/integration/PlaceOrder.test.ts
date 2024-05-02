import PlaceOrder from "../../src/application/usecase/PlaceOrder";
test("Deve fazer um pedido", async function () {
  const placeOrder = new PlaceOrder();
  const input = {
    cpf: "839.435.452-10",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    date: new Date("2021-12-10"),
    coupon:"VALE20"
  };
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(1000);
});
