
const items = [
  { label: 'Fan' },
  { label: 'TV' },
  { label: 'Bed' },
  { label: 'Mattress' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

export { items };
