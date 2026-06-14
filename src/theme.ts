// styled-components theme — colours and spacing matched to JobTestPrep's design
export const theme = {
  colors: {
    // Primary brand green — matches JTP buttons, links, accents
    primary: '#1e7d5e',
    primaryHover: '#165f47',
    danger: '#c0392b',
    success: '#1e7d5e',
    bg: '#f4f9f7',           // very light green-tinted page background
    surface: '#ffffff',
    border: '#cde8de',       // soft teal border used on JTP cards
    text: '#1a2e27',         // near-black with a green tint
    muted: '#5b7b71',        // muted green-grey for subtitles
  },
  radii: {
    sm: '6px',              // inputs and small buttons
    md: '12px',             // cards inner elements
    lg: '16px',             // main cards
  },
  // JTP uses very subtle shadows — the border does the work
  shadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
} as const;

export type Theme = typeof theme;
