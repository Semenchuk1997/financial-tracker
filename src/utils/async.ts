export async function asyncMap<T, K>(
  array: T[],
  callback: (item: T, index: number) => Promise<K> | K,
): Promise<K[]> {
  return Promise.all(array.map(callback));
}

export async function asyncSequential<T, K>(
  array: T[],
  callback: (item: T, index: number, length: number) => Promise<K>,
): Promise<K[]> {
  const result: K[] = [];
  const length = array.length;
  let index = 0;

  for (const item of array) {
    result.push(await callback(item, index++, length));
  }

  return result;
}
