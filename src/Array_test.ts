import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";

import * as A from "./Array.ts";
import * as O from "./Option.ts";
import { pipe } from "./Function.ts";

Deno.test("Array - all", () => {
  const x = pipe(
    [1, 2, 3, 4, 5],
    A.all((n) => n > 0)
  );

  const y = A.all([1, 2, 3, 4, 5], (n) => n > 0);

  const z = pipe(
    ["hi", "hello", "howdy", "bye", "hey there"],
    A.all((str) => str.startsWith("h"))
  );

  assertEquals(x, true);
  assertEquals(y, true);
  assertEquals(z, false);
});

Deno.test("Array - any", () => {
  const x = pipe(
    [1, 2, 3, 4, 5],
    A.any((n) => n < 0)
  );

  const y = A.any([1, 2, 3, 4, 5], (n) => n > 4);

  const z = pipe(
    ["hi", "hello", "howdy", "bye", "hey there"],
    A.any((str) => str.startsWith("h"))
  );

  assertEquals(x, false);
  assertEquals(y, true);
  assertEquals(z, true);
});

Deno.test("Array - append", () => {
  const x = pipe([1, 2, 3, 4, 5], A.append(6));

  const y = A.append([1, 2, 3, 4, 5], 6);

  const arr = [1, 2, 3, 4, 5];
  const z = A.append(arr, 6);

  assertEquals(x, [1, 2, 3, 4, 5, 6]);
  assertEquals(y, [1, 2, 3, 4, 5, 6]);
  assertEquals(arr, [1, 2, 3, 4, 5]);
  assertEquals(z, [1, 2, 3, 4, 5, 6]);
});

Deno.test("Array - at", () => {
  const x = pipe([1, 2, 3, 4, 5], A.at(2), O.unwrapOr(0));

  const y = pipe([1, 2, 3, 4, 5], A.at(6), O.unwrapOr(0));

  const z = pipe(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    A.at(5),
    O.match(
      (n) => `yes ${n} is at index 5`,
      () => "nope not there"
    )
  );

  assertEquals(x, 3);
  assertEquals(y, 0);
  assertEquals(z, "yes 6 is at index 5");
});

Deno.test("Array - concat", () => {
  const x = pipe([1, 2, 3, 4, 5], A.concat([6, 7, 8, 9, 10]));

  const y = A.concat([1, 2, 3, 4, 5], [6, 7, 8, 9, 10]);

  const z = pipe([6, 7, 8, 9, 10], A.concat([1, 2, 3, 4, 5]));

  assertEquals(x, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assertEquals(y, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assertEquals(z, [6, 7, 8, 9, 10, 1, 2, 3, 4, 5]);
});

Deno.test("Array - clone", () => {
  const x = A.clone([1, 2, 3, 4, 5]);

  assertEquals(x, [1, 2, 3, 4, 5]);
});

Deno.test("Array - diff", () => {
  const x = pipe([1, 2, 3, 4, 5], A.diff([1, 3, 5]));

  const y = A.diff([1, 2, 3, 4, 5], [1, 3, 5]);

  const z = pipe(
    [1, 2, 3, 4, 5],
    A.diff([1, 3, 5]),
    A.diff([2, 4]),
    A.at(0),
    O.unwrapOr(0)
  );

  const a = pipe([], A.diff([1, 3, 5]));

  const b = pipe([1, 3, 5], A.diff([2, 4, 6]));

  assertEquals(x, [2, 4]);
  assertEquals(y, [2, 4]);
  assertEquals(z, 0);
  assertEquals(a, []);
  assertEquals(b, [1, 3, 5]);
});

Deno.test("Array - drop", () => {
  const x = pipe([1, 2, 3, 4, 5], A.drop(2), O.unwrapOr([] as number[]));
  const y = pipe([1, 2, 3, 4, 5], A.drop(6), O.unwrapOr([] as number[]));
  const z = pipe([1, 2, 3, 4, 5], A.drop(-1), O.unwrapOr([] as number[]));

  assertEquals(x, [3, 4, 5]);
  assertEquals(y, []);
  assertEquals(z, []);
});

Deno.test("Array - find", () => {
  const x = pipe(
    [1, 2, 3, 4, 5],
    A.find((n) => n > 3),
    O.unwrapOr(0)
  );

  const y = pipe(
    [1, 2, 3, 4, 5],
    A.find((n) => n < 0),
    O.unwrapOr(0)
  );

  assertEquals(x, 4);
  assertEquals(y, 0);
});
