const COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Ruby: "#701516",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Shell: "#89e051",
  PHP: "#4F5D95",
  Dart: "#00B4AB",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Scala: "#c22d40",
  Haskell: "#5e5086",
  Elixir: "#6e4a7e",
  Clojure: "#db5855",
  Lua: "#000080",
  R: "#198CE7",
  MATLAB: "#e16737",
  Nix: "#7e7eff",
  Dockerfile: "#384d54",
};

export function getLanguageColor(language: string | null): string {
  if (!language) return "#8b949e";
  return COLORS[language] ?? "#8b949e";
}
