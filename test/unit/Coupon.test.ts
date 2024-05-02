import Coupon from "../../src/domain/entity/Coupon"

test("Deve criar um coupon de desconto válido", function(){
    const coupon = new Coupon("VALE20", 20);
    const today = new Date("2024-04-28");
    const isValid = coupon.isValid(today);
    expect(isValid).toBeTruthy();
})
test("Deve criar um coupon de desconto expirado", function(){
    const coupon = new Coupon("VALE20", 20, new Date("2024-04-27"));
    const today = new Date("2024-04-28");
    const isExpired = coupon.isExpired(today);
    expect(isExpired).toBeTruthy();
})
test("Deve criar um coupon de desconto válido e calcular o desconto", function(){
    const coupon = new Coupon("VALE20", 20);
    const today = new Date("2024-04-28");
    const amount = coupon.calculateDiscount(1000);
    expect(amount).toBe(200);
})