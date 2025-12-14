import { ReactNode, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  className?: string;
  size?: number;
  strokeWidth?: number;
};

function BaseIcon({
  children,
  className = 'w-6 h-6',
  size = 24,
  strokeWidth = 1.7,
  ...rest
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function IconPlay(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10 9.5l5 2.5-5 2.5z" />
    </BaseIcon>
  );
}

export function IconGift(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="8" width="18" height="12" rx="2.5" />
      <path d="M3 13h18M12 8v12" />
      <path d="M9.5 4.5c-1.5 0-2.5 1.2-2.5 2.3S8.3 9 9.5 9c1.6 0 2.5-.9 2.5-2.2 0-1.2-.9-2.3-2.5-2.3zm5 0c1.5 0 2.5 1.2 2.5 2.3S16.7 9 15.5 9C13.9 9 13 8.1 13 6.8c0-1.2.9-2.3 2.5-2.3z" />
    </BaseIcon>
  );
}

export function IconTarget(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 4V2M12 22v-2M20 12h2M2 12h2" />
    </BaseIcon>
  );
}

export function IconStar(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3.5l2.4 4.9 5.4.8-3.9 3.8.9 5.5-4.8-2.5-4.8 2.5.9-5.5-3.9-3.8 5.4-.8z" />
    </BaseIcon>
  );
}

export function IconGamepad(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3.5" y="9" width="17" height="8" rx="4" />
      <path d="M8.5 13h3M10 11.5v3" />
      <circle cx="15.5" cy="12.5" r="0.9" />
      <circle cx="17.5" cy="14.5" r="0.9" />
    </BaseIcon>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="9" cy="9" r="3" />
      <path d="M4.5 18.5c0-2.4 2-4.5 4.5-4.5s4.5 2.1 4.5 4.5" />
      <path d="M15.5 10a2.5 2.5 0 100-5" />
      <path d="M14 14h2c1.9 0 3.5 1.6 3.5 3.5" />
    </BaseIcon>
  );
}

export function IconRefresh(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 12a8 8 0 0113.7-5.6L20 9M4 12a8 8 0 0013.7 5.6L20 15" />
      <path d="M20 9V5h-4M20 15v4h-4" />
    </BaseIcon>
  );
}

export function IconTrophy(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M8 4h8v3.5a4 4 0 01-8 0V4z" />
      <path d="M10 17h4M9 21h6M8 10H5a2 2 0 01-2-2V6h3M16 10h3a2 2 0 002-2V6h-3" />
    </BaseIcon>
  );
}

export function IconBook(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6.5 5.5A3 3 0 019 4h9v15H9a3 3 0 00-2.5 1.5" />
      <path d="M6.5 5.5A3 3 0 004 8v10a3 3 0 012.5 1.5" />
      <path d="M9 7h7M9 10h6" />
    </BaseIcon>
  );
}

export function IconFlag(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 4v17" />
      <path d="M5 5h9l-2 4 2 4H5" />
    </BaseIcon>
  );
}

export function IconController(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="9" width="18" height="8.5" rx="4.25" />
      <path d="M8.5 13h3M10 11.5v3" />
      <circle cx="15.5" cy="12.5" r="0.9" />
      <circle cx="17.5" cy="14.5" r="0.9" />
    </BaseIcon>
  );
}

export function IconCopy(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2.2" />
      <rect x="4" y="4" width="11" height="11" rx="2.2" />
    </BaseIcon>
  );
}

export function IconChat(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M20 11.5c0-3.6-3.2-6.5-7.2-6.5H8c-2.8 0-5 2.2-5 5s2.2 5 5 5h1v3l3-3h2.8c3.2 0 5.2-2.1 5.2-4.5z" />
    </BaseIcon>
  );
}

export function IconBird(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M20 7.6a5.4 5.4 0 01-1.9.7 2.7 2.7 0 001.2-1.6 5.4 5.4 0 01-2 .8 2.8 2.8 0 00-4.8 2v.6A8 8 0 014.6 6.6a2.8 2.8 0 00.9 3.7 2.8 2.8 0 01-1.3-.3v.1a2.8 2.8 0 002.3 2.7 2.8 2.8 0 01-1.3 0 2.8 2.8 0 002.6 1.9 5.8 5.8 0 01-3.5 1.1h-.7a8.1 8.1 0 0012.5-6.7v-.3a5.4 5.4 0 001.8-1.9z" />
    </BaseIcon>
  );
}

export function IconYoutube(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="4" y="7" width="16" height="10" rx="2.5" />
      <path d="M11 10l4 2-4 2z" />
    </BaseIcon>
  );
}

export function IconGroup(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="9" cy="9.5" r="2.5" />
      <path d="M3.5 18c0-2.8 2.3-5 5-5s5 2.2 5 5" />
      <path d="M15.5 10a2.5 2.5 0 100-5" />
      <path d="M14.5 13.5h1.7A3.3 3.3 0 0119.5 17" />
    </BaseIcon>
  );
}

export function IconSparkles(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3l1.6 3.9 3.9 1.6-3.9 1.6L12 14l-1.6-3.9-3.9-1.6 3.9-1.6z" />
      <path d="M18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9z" />
      <path d="M6 15l.7 1.7 1.7.7-1.7.7L6 20l-.7-1.7-1.7-.7 1.7-.7z" />
    </BaseIcon>
  );
}

export function IconQuestion(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.4 9a2.6 2.6 0 115.2.4c0 1.3-1.1 1.9-1.7 2.5-.4.4-.5.8-.5 1.6" />
      <circle cx="12" cy="17" r="0.9" />
    </BaseIcon>
  );
}

export function IconLightbulb(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M9 14.5c-1.3-1.1-2-2.7-2-4.4A5 5 0 0112 5a5 5 0 015 5c0 1.7-.7 3.3-2 4.4-.6.5-1 1.2-1 2V17h-2v-.6c0-.8-.4-1.5-1-1.9z" />
    </BaseIcon>
  );
}

export function IconBell(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6 10a6 6 0 1112 0v3.5l1.5 1.5H4.5L6 13.5z" />
      <path d="M10 18a2 2 0 004 0" />
    </BaseIcon>
  );
}

export function IconClock(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </BaseIcon>
  );
}

export function IconBookmark(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 4h10v16l-5-3-5 3z" />
    </BaseIcon>
  );
}

export function IconHome(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 11l8-7 8 7" />
      <path d="M5.5 10.5V20h13V10.5" />
      <path d="M10 20v-6h4v6" />
    </BaseIcon>
  );
}

export function IconExternalLink(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </BaseIcon>
  );
}

export function IconFacebook(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M13 10h2V7.5c0-.8.6-1.5 1.5-1.5H17" />
      <path d="M13 10h-2v4h2v5" />
    </BaseIcon>
  );
}

export function IconReddit(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="13" r="5.5" />
      <circle cx="9.5" cy="12.5" r="0.9" />
      <circle cx="14.5" cy="12.5" r="0.9" />
      <path d="M9 14.5c.6.7 1.8 1.1 3 1.1s2.4-.4 3-1.1" />
      <path d="M12 7l1-3 3 1.2" />
      <circle cx="17" cy="9" r="1" />
      <circle cx="7" cy="9" r="1" />
      <path d="M14 7.5c-.6-.3-1.3-.5-2-.5s-1.4.2-2 .5" />
    </BaseIcon>
  );
}

export function IconInstagram(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="17" cy="7.5" r="0.9" />
    </BaseIcon>
  );
}

export function IconTikTok(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M10 9v7a2.5 2.5 0 01-5 0 2.5 2.5 0 012.5-2.5A2.5 2.5 0 0110 16" />
      <path d="M10 9V5h2.5A4.5 4.5 0 0017 7.5V9a4 4 0 003 1" />
    </BaseIcon>
  );
}

export function IconInfo(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 16v-5M12 8h.01" />
    </BaseIcon>
  );
}
