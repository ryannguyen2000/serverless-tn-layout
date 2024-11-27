export function extractVariantAndId(data) {
  return data.map((item) => ({
    variant: item.variation,
    id: item.id,
    columns: "1",
    rows: "1",
    colspan: "1",
    rowspan: "1",
    gap: "1",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    type: "content",
    style: {},
    childs: [],
  }));
}

export function formatString(input) {
  const cleanedString = input.replace(/[^a-zA-Z0-9]+/g, " ");

  const formattedString = cleanedString
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return formattedString;
}

export function processString(input) {
  const [beforeDollar] = input.split("$");

  const formattedString = beforeDollar
    .replace(/[^a-zA-Z0-9]/g, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedString;
}
