import { Complex } from '../../types/base';

export class QuantumGates {
  static hadamard(state: Complex[]): Complex[] {
    const factor = 1 / Math.sqrt(2);
    return [
      {
        real: (state[0].real + state[1].real) * factor,
        imaginary: (state[0].imaginary + state[1].imaginary) * factor
      },
      {
        real: (state[0].real - state[1].real) * factor,
        imaginary: (state[0].imaginary - state[1].imaginary) * factor
      }
    ];
  }

  static pauliX(state: Complex[]): Complex[] {
    return [state[1], state[0]];
  }

  static pauliY(state: Complex[]): Complex[] {
    return [
      { real: -state[1].imaginary, imaginary: state[1].real },
      { real: state[0].imaginary, imaginary: -state[0].real }
    ];
  }

  static pauliZ(state: Complex[]): Complex[] {
    return [
      state[0],
      { real: -state[1].real, imaginary: -state[1].imaginary }
    ];
  }

  static phase(state: Complex[], angle: number): Complex[] {
    const phase = {
      real: Math.cos(angle),
      imaginary: Math.sin(angle)
    };
    return [
      state[0],
      {
        real: state[1].real * phase.real - state[1].imaginary * phase.imaginary,
        imaginary: state[1].real * phase.imaginary + state[1].imaginary * phase.real
      }
    ];
  }
}