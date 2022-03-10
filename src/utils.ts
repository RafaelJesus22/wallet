export function removeDots(text: string) {
  return text.replace(/\./g, '');
}

export function delay(s: number) {
  return new Promise(resolve => setTimeout(resolve, s * 1000));
}