export function ajustLibelle(value: string): string[] {
  const words: string[] = value.split(' ');
  const result: string[] = [];
  let temp: string = '';

  for (const mot of words) {
    if ((temp + mot).length <= 10) {
      temp += (temp ? ' ' : '') + mot;
    } else {
      result.push(temp);
      temp = mot;
    }
  }

  if (temp) {
    result.push(temp);
  }

  return result;
}
