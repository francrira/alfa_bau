import type { CSSProperties } from "react";

const paths: Record<string, React.ReactNode> = {
  worker: <><path d="M17 15a7 7 0 0 1 14 0M16 15h16M21 9V5h6v4M19 18a5 5 0 0 0 10 0M14 36v-6a8 8 0 0 1 8-8h4a8 8 0 0 1 8 8v6M20 25v11M28 25v11M11 39h26M24 28v8" /></>,
  helmet: <><path d="M12 24a12 12 0 0 1 24 0M10 24h28M20 14V9h8v5M17 27a7 7 0 0 0 14 0M13 41v-3a9 9 0 0 1 9-9h4a9 9 0 0 1 9 9v3M21 33v8M27 33v8" /></>,
  machine: <><circle cx="14" cy="35" r="6" /><circle cx="34" cy="35" r="6" /><path d="M8 35H4v-8h18V11h10l4 18M22 15h7l2 11h-9M20 35h8M37 18l5 11h3v7h-5M11 21h7v6M12 12v9" /></>,
  paving: <><path d="M6 39h36M8 31h32v8H8zM12 23h24v8H12zM16 15h16v8H16zM24 15v8M20 23v8M28 31v8M16 31v8M6 11l3-5M37 13l5-3" /></>,
  pipe: <><path d="M7 15h15v8H7zM22 15h7a12 12 0 0 1 12 12v14h-8V27a4 4 0 0 0-4-4h-7M7 12v14M22 12v14M30 33h14M30 40h14M6 35h17M9 31v8M20 31v8" /></>,
  team: <><circle cx="24" cy="10" r="4" /><circle cx="10" cy="15" r="4" /><circle cx="38" cy="15" r="4" /><path d="M18 39V23a6 6 0 0 1 12 0v16M24 29v10M4 40V28a6 6 0 0 1 12 0M10 31v9M32 28a6 6 0 0 1 12 0v12M38 31v9M16 23h-1M32 23h1" /></>,
  shield: <><path d="M24 5l15 6v12c0 10-15 19-15 19S9 33 9 23V11zM17 23l5 5 10-11" /></>,
  clock: <><circle cx="24" cy="24" r="17" /><path d="M24 13v12l8 5" /></>,
  truck: <><path d="M4 13h25v23H4zM29 21h9l6 8v7H29M33 23v7h10" /><circle cx="12" cy="37" r="4" /><circle cx="35" cy="37" r="4" /></>,
  arrow: <path d="M7 24h32M29 14l10 10-10 10" />,
  phone: <path d="M10 6l8 1 3 10-5 4c3 6 6 9 12 12l4-5 10 3 1 8c-1 9-20 2-29-7S2 8 10 6z" />,
  mail: <><rect x="5" y="10" width="38" height="28" rx="2" /><path d="M5 12l19 15 19-15" /></>,
  pin: <><path d="M37 19c0 10-13 23-13 23S11 29 11 19a13 13 0 0 1 26 0z" /><circle cx="24" cy="19" r="4" /></>,
  image: <><rect x="5" y="7" width="38" height="34" rx="2" /><circle cx="16" cy="17" r="4" /><path d="M5 35l12-10 8 7 8-12 10 15" /></>,
  menu: <path d="M7 12h34M7 24h34M7 36h34" />,
  close: <path d="M10 10l28 28M38 10L10 38" />,
};
export default function Icon({ name, className = "", style }: { name: string; className?: string; style?: CSSProperties }) {
  return <svg className={"icon " + className} style={style} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] ?? paths.worker}</svg>;
}
