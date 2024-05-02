export default class Cpf {
  value: string;
  constructor(value: string) {
    if (!this.validate(value)) throw new Error("Invalid cpf");
    this.value = value;
  }
  clean(cpf: string) {
    return cpf.replace(/[\.\-]*/g, "");
  }
  isValidLength(cpf: string) {
    return cpf.length === 11;
  }
  isBlocked(cpf: string) {
    let [firstDigit] = cpf;
    return [...cpf].every((digit: any) => digit === firstDigit);
  }
  calculateDigit(cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    let rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  }

  validate(rawCpf: string) {
    if (!rawCpf) return false;
    let cpf = this.clean(rawCpf);
    if (!this.isValidLength(cpf)) return false;
    if (this.isBlocked(cpf)) return false;

    let dg1 = this.calculateDigit(cpf, 10);
    let dg2 = this.calculateDigit(cpf, 11);

    let nDigVerific = cpf.substring(cpf.length - 2, cpf.length);
    const nDigResult = "" + dg1 + "" + dg2;
    return nDigVerific == nDigResult;
  }
}
