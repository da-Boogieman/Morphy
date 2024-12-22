import { OpCode } from './types';
import type { VMContext, VMState, VMInstruction } from './types';

export class VirtualMachine {
  private static instance: VirtualMachine;
  private stack: any[] = [];
  private memory: Map<string, any> = new Map();
  private state: VMState = {
    pc: 0,
    sp: 0,
    running: false,
    error: null
  };

  private constructor() {}

  static getInstance(): VirtualMachine {
    if (!VirtualMachine.instance) {
      VirtualMachine.instance = new VirtualMachine();
    }
    return VirtualMachine.instance;
  }

  async execute(bytecode: Uint8Array, context: VMContext = {}): Promise<any> {
    this.initialize(context);

    try {
      while (this.state.pc < bytecode.length && this.state.running) {
        const instruction = this.decode(bytecode);
        await this.executeInstruction(instruction);
      }

      return this.stack.pop();
    } catch (error) {
      this.state.error = error instanceof Error ? error.message : 'VM execution error';
      throw error;
    } finally {
      this.cleanup();
    }
  }

  private initialize(context: VMContext): void {
    this.stack = [];
    this.memory.clear();
    this.state = {
      pc: 0,
      sp: 0,
      running: true,
      error: null
    };

    // Load context into memory
    Object.entries(context).forEach(([key, value]) => {
      this.memory.set(key, value);
    });
  }

  private decode(bytecode: Uint8Array): VMInstruction {
    const opcode = bytecode[this.state.pc++];
    
    switch (opcode) {
      case OpCode.CONSTANT:
        return {
          type: 'constant',
          value: bytecode[this.state.pc++]
        };
      case OpCode.ADD:
      case OpCode.SUBTRACT:
      case OpCode.MULTIPLY:
      case OpCode.DIVIDE:
        return { type: 'arithmetic', opcode };
      case OpCode.LOAD:
        return {
          type: 'load',
          address: bytecode[this.state.pc++]
        };
      case OpCode.STORE:
        return {
          type: 'store',
          address: bytecode[this.state.pc++]
        };
      case OpCode.CALL:
        return {
          type: 'call',
          address: bytecode[this.state.pc++],
          args: bytecode[this.state.pc++]
        };
      case OpCode.RETURN:
        return { type: 'return' };
      case OpCode.JUMP:
        return {
          type: 'jump',
          offset: bytecode[this.state.pc++]
        };
      case OpCode.JUMP_IF:
        return {
          type: 'jumpIf',
          offset: bytecode[this.state.pc++]
        };
      default:
        throw new Error(`Unknown opcode: ${opcode}`);
    }
  }

  private async executeInstruction(instruction: VMInstruction): Promise<void> {
    switch (instruction.type) {
      case 'constant':
        this.stack[this.state.sp++] = instruction.value;
        break;

      case 'arithmetic':
        const b = this.stack[--this.state.sp];
        const a = this.stack[--this.state.sp];
        let result;

        switch (instruction.opcode) {
          case OpCode.ADD:
            result = a + b;
            break;
          case OpCode.SUBTRACT:
            result = a - b;
            break;
          case OpCode.MULTIPLY:
            result = a * b;
            break;
          case OpCode.DIVIDE:
            if (b === 0) throw new Error('Division by zero');
            result = a / b;
            break;
        }

        this.stack[this.state.sp++] = result;
        break;

      case 'load':
        const value = this.memory.get(instruction.address);
        if (value === undefined) {
          throw new Error(`Undefined variable: ${instruction.address}`);
        }
        this.stack[this.state.sp++] = value;
        break;

      case 'store':
        this.memory.set(instruction.address, this.stack[--this.state.sp]);
        break;

      case 'call': {
        const func = this.memory.get(instruction.address);
        if (typeof func !== 'function') {
          throw new Error(`Not a function: ${instruction.address}`);
        }

        const args = [];
        for (let i = 0; i < instruction.args; i++) {
          args.unshift(this.stack[--this.state.sp]);
        }

        const callResult = await func(...args);
        this.stack[this.state.sp++] = callResult;
        break;
      }

      case 'return':
        this.state.running = false;
        break;

      case 'jump':
        this.state.pc += instruction.offset;
        break;

      case 'jumpIf':
        if (this.stack[--this.state.sp]) {
          this.state.pc += instruction.offset;
        }
        break;
    }
  }

  private cleanup(): void {
    this.state.running = false;
    this.state.pc = 0;
    this.state.sp = 0;
  }
}