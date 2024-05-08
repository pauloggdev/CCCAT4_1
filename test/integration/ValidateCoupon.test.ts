import ValidateCoupon from "../../src/application/usecase/validate_coupon/ValidateCoupon";
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter";
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase";

let validateCoupon: ValidateCoupon;
beforeEach(() => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  const couponRepository = new CouponRepositoryDatabase(connection);
  validateCoupon = new ValidateCoupon(couponRepository);
});
test("Deve validar um coupom de desconto", async function () {
  const isValid = await validateCoupon.execute("VALE20");
  expect(isValid).toBeTruthy();
});
test("Deve invalidar um coupom de desconto", async function () {
  const isValid = await validateCoupon.execute("VALE20_EXPIRED");
  expect(isValid).toBeFalsy();
});
