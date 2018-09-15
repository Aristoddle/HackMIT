
const rooms = [
  { label: 'Bedroom' },
  { label: 'Full Bath' },
  { label: 'Half Bath' },
  { label: 'Kitchen' },
  { label: 'Living Room' },
  { label: 'Family Room' },
  { label: 'Storage Room' },
  { label: 'Foyer' },
  { label: 'Walk-In Closet' },
  { label: 'TV Room' },
  { label: 'Sun Room' },
  { label: 'Screened In Porch' },
  { label: 'Sitting Room' },
  { label: 'Library' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

export { rooms };
