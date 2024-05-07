import OrderCode from "../../src/domain/entity/OrderCode";

test("Deve criar um código de pedido", function(){
    const date = new Date("2024-04-01");
    const sequence = 1;
    const orderCode = new OrderCode(date, sequence);
    expect(orderCode.value).toBe("202400000001")

})