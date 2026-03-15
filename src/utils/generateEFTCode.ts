// Utility to generate a 6-digit EFT reference code
export function generateEFTCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
