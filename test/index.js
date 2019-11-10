import test from 'tape';
import Zet from '../src';

const eq = (t, a, b) => {
  a = [...a.values()];
  return t.deepEqual(a, b);
};

test('exports', t => {
  t.is(typeof Zet, 'function', '~> a function');
  t.end();
});

test('basic', t => {
  let x = new Zet([1, 2, 2, 3, 4]);
  t.is(x.size, 4);
  t.ok(x.has(2));
  t.end();
});

test('static :: union ∪', t => {
  let x = new Zet([1,2,3]);
  let y = new Zet([2,3,4]);
  let z = new Zet([4,5,6]);
  eq(t, Zet.union(x), [1,2,3]);
  eq(t, Zet.union(x, y), [1,2,3,4]);
  eq(t, Zet.union(x, y, z), [1,2,3,4,5,6]);
  t.end();
});

test('static :: intersection ∩', t => {
  let x = new Zet([1,2,3]);
  let y = new Zet([2,3,4]);
  let z = new Zet([3,4,5]);
  eq(t, Zet.intersection(x), [1,2,3]);
  eq(t, Zet.intersection(x, y), [2,3]);
  eq(t, Zet.intersection(x, y, z), [3]);
  t.end();
});

test('static :: difference -', t => {
  let x = new Zet([1,2,3]);
  let y = new Zet([4,3,2]);
  let z = new Zet([3,4,5]);
  let w = new Zet([1,6,7]);
  eq(t, Zet.difference(x), []);
  eq(t, Zet.difference(x, y), [1]);
  eq(t, Zet.difference(x, z), [1, 2]);
  eq(t, Zet.difference(x, y, z), [1]);
  eq(t, Zet.difference(x, y, z, w), []);
  t.end();
});

test('static :: symmetricDifference \\', t => {
  let x = new Zet([1,2,3]);
  let y = new Zet([4,3,2]);
  let z = new Zet([3,4,5]);
  let w = new Zet([1,6,7]);
  eq(t, Zet.symmetricDifference(x), [1,2,3]);
  eq(t, Zet.symmetricDifference(x, y), [1,4]);
  eq(t, Zet.symmetricDifference(x, z), [1,2,4,5]);
  eq(t, Zet.symmetricDifference(z, w), [3,4,5,1,6,7]);
  t.end();
});

test('static :: subset ⊆', t => {
  let x = new Zet([1,2]);
  let y = new Zet([1,2,3]);
  t.ok(Zet.subset(x,y));
  t.ok(Zet.subset(x,x));
  t.notOk(Zet.subset(y,x));
  t.end();
});

test('static :: superset ⊇', t => {
  let x = new Zet([1,2,3]);
  let y = new Zet([1,2]);
  t.ok(Zet.superset(x,y));
  t.ok(Zet.superset(x,x));
  t.notOk(Zet.superset(y,x));
  t.end();
});

test('static :: map', t => {
  let x = new Zet([1,4,9,16]);
  eq(t, Zet.map(x, i => i * 2), [2,8,18,32]);
  t.end();
});

test('static :: filter', t => {
  let x = new Zet([1,2,3]);
  eq(t, Zet.filter(x, i => i % 2), [1, 3]);
  t.end();
});

test('static :: reduce', t => {
  let x = new Zet([1,2,3,4]);
  t.is(Zet.reduce(x, (i, j) => i + j), 10);
  t.is(Zet.reduce(x, (i, j) => i + j, 5), 15);
  t.end();
});

test('instance :: union ∩', t => {
  let x = new Zet([1,2,3]);
  let y = new Zet([2,3,4]);
  let z = new Zet([4,5,6]);
  eq(t, x.union(), [1,2,3]);
  eq(t, x.union(y), [1,2,3,4]);
  eq(t, x.union(y, z), [1,2,3,4,5,6]);
  t.end();
});

test('instance :: intersection ∩', t => {
  let x = new Zet([1,2,3]);
  let y = new Zet([2,3,4]);
  let z = new Zet([3,4,5]);
  eq(t, x.intersection(), [1,2,3]);
  eq(t, x.intersection(y), [2,3]);
  eq(t, x.intersection(y, z), [3]);
  t.end();
});

test('instance :: difference -', t => {
  let x = new Zet([1,2,3]);
  let y = new Zet([4,3,2]);
  let z = new Zet([3,4,5]);
  let w = new Zet([1,6,7]);
  eq(t, x.difference(), []);
  eq(t, x.difference(y), [1]);
  eq(t, x.difference(z), [1, 2]);
  eq(t, x.difference(y, z), [1]);
  eq(t, x.difference(y, z, w), []);
  t.end();
});

test('instance :: symmetricDifference \\', t => {
  let x = new Zet([1,2,3]);
  let y = new Zet([4,3,2]);
  let z = new Zet([3,4,5]);
  let w = new Zet([1,6,7]);
  eq(t, x.symmetricDifference(), [1,2,3]);
  eq(t, x.symmetricDifference(y), [1,4]);
  eq(t, x.symmetricDifference(z), [1,2,4,5]);
  eq(t, z.symmetricDifference(w), [3,4,5,1,6,7]);
  t.end();
});

test('instance :: subset ⊆', t => {
  let x = new Zet([1,2]);
  let y = new Zet([1,2,3]);
  t.ok(x.subset(y));
  t.ok(x.subset(x));
  t.notOk(y.subset(x));
  t.end();
});

test('instance :: superset ⊇', t => {
  let x = new Zet([1,2,3]);
  let y = new Zet([1,2]);
  t.ok(x.superset(y));
  t.ok(x.superset(x));
  t.notOk(y.superset(x));
  t.end();
});

test('instance :: map', t => {
  let x = new Zet([1,4,9,16]);
  eq(t, x.map(i => i * 2), [2,8,18,32]);
  t.end();
});

test('instance :: filter', t => {
  let x = new Zet([1,2,3]);
  eq(t, x.filter(i => i % 2), [1, 3]);
  t.end();
});

test('instance :: reduce', t => {
  let x = new Zet([1,2,3,4]);
  t.is(x.reduce((i, j) => i + j), 10);
  t.is(x.reduce((i, j) => i + j, 5), 15);
  t.end();
});
