import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill TextEncoder/TextDecoder for Node environment
global.TextEncoder = TextEncoder;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.TextDecoder = TextDecoder as any;

// Polyfill for fetch Headers
if (typeof global.Headers === 'undefined') {
  global.Headers = class Headers extends Map {
    append(name: string, value: string) {
      this.set(name, value);
    }
    get(name: string) {
      return super.get(name) || null;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
}
