import { Complex } from '../../../../types/quantum';

export class ComplexMath {
  static add(a: Complex, b: Complex): Complex {
    return {
      real: a.real + b.real,
      imaginary: a.imaginary + b.imaginary
    };
  }

  static multiply(a: Complex, b: Complex): Complex {
    return {
      real: a.real * b.real - a.imaginary * b.imaginary,
      imaginary: a.real * b.imaginary + a.imaginary * b.real
    };
  }

  static magnitude(a: Complex): number {
    return Math.sqrt(a.real * a.real + a.imaginary * a.imaginary);
  }

  static phase(a: Complex): number {
    return Math.atan2(a.imaginary, a.real);
  }
}