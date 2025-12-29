import { describe, it, expect } from 'vitest';
import { canUseDOM } from '../utils/canUseDOM';
import { mergeRefs } from '../utils/mergeRefs';

describe('canUseDOM', () => {
  it('should return true in jsdom environment', () => {
    expect(canUseDOM).toBe(true);
  });
});

describe('mergeRefs', () => {
  it('should handle null refs', () => {
    const merged = mergeRefs(null, null);
    merged(document.createElement('div'));
    // Should not throw
    expect(true).toBe(true);
  });

  it('should call function refs', () => {
    let ref1Value: HTMLElement | null = null;
    let ref2Value: HTMLElement | null = null;

    const ref1 = (el: HTMLElement | null) => { ref1Value = el; };
    const ref2 = (el: HTMLElement | null) => { ref2Value = el; };

    const merged = mergeRefs(ref1, ref2);
    const element = document.createElement('div');
    
    merged(element);

    expect(ref1Value).toBe(element);
    expect(ref2Value).toBe(element);
  });

  it('should set object refs', () => {
    const ref1 = { current: null as HTMLElement | null };
    const ref2 = { current: null as HTMLElement | null };

    const merged = mergeRefs(ref1, ref2);
    const element = document.createElement('div');
    
    merged(element);

    expect(ref1.current).toBe(element);
    expect(ref2.current).toBe(element);
  });

  it('should handle mixed ref types', () => {
    let funcRefValue: HTMLElement | null = null;
    const funcRef = (el: HTMLElement | null) => { funcRefValue = el; };
    const objRef = { current: null as HTMLElement | null };

    const merged = mergeRefs(funcRef, objRef);
    const element = document.createElement('div');
    
    merged(element);

    expect(funcRefValue).toBe(element);
    expect(objRef.current).toBe(element);
  });

  it('should handle cleanup (null value)', () => {
    const ref1 = { current: document.createElement('div') };
    const ref2 = { current: document.createElement('div') };

    const merged = mergeRefs(ref1, ref2);
    merged(null);

    expect(ref1.current).toBe(null);
    expect(ref2.current).toBe(null);
  });
});
