/* Aplica el tema de un gym a las variables CSS globales (:root) */
export function applyTheme(theme) {
  if (!theme) return;
  const r = document.documentElement;
  if (theme.accent) r.style.setProperty('--accent', theme.accent);
  if (theme.accentInk) r.style.setProperty('--accent-ink', theme.accentInk);
  if (theme.bg) r.style.setProperty('--bg', theme.bg);
}
