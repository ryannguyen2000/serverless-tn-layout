export function extractVariantAndId(data) {
  return data.map((item) => ({
    variant: item.variation,
    id: item.id,
  }));
}
