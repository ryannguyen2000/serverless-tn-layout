export function extractVariantAndId(data) {
  return data.map((item) => ({
    variant: item.variation,
    id: item.id,
    columns: "1",
    rows: "1",
    colspan: "1",
    rowspan: "1",
    type: "content",
  }));
}
