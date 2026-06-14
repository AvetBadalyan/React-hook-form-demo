export const theme = {
  colors: {
    primary: '#1e7d5e',
    primaryHover: '#165f47',
    danger: '#c0392b',
    success: '#1e7d5e',
    bg: '#f4f9f7',
    surface: '#ffffff',
    border: '#cde8de',
    text: '#1a2e27',
    muted: '#5b7b71',
  },
  radii: {
    sm: '6px',
    md: '12px',
    lg: '16px',
  },
  shadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
} as const;

export type Theme = typeof theme;
