import React from "react";
import { SVGProps } from "react";

type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const UsersIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    height={size || height}
    role="presentation"
    width={size || width}
    {...props}
  >
    <path d="M7.5 9A3.5 3.5 0 1 0 4 5.5 3.504 3.504 0 0 0 7.5 9zm0-6A2.5 2.5 0 1 1 5 5.5 2.503 2.503 0 0 1 7.5 3zm2.713 14a5.456 5.456 0 0 0-.188 1H2v-3.5A4.505 4.505 0 0 1 6.5 10h2a4.503 4.503 0 0 1 4.414 3.649 5.518 5.518 0 0 0-.936.632A3.495 3.495 0 0 0 8.5 11h-2A3.504 3.504 0 0 0 3 14.5V17zm6.287-4A3.5 3.5 0 1 0 13 9.5a3.504 3.504 0 0 0 3.5 3.5zm0-6A2.5 2.5 0 1 1 14 9.5 2.503 2.503 0 0 1 16.5 7zM22 18.5a4.505 4.505 0 0 0-4.5-4.5h-2a4.505 4.505 0 0 0-4.5 4.5V22h11zM21 21h-9v-2.5a3.504 3.504 0 0 1 3.5-3.5h2a3.504 3.504 0 0 1 3.5 3.5z" />
    <path fill="none" d="M0 0h24v24H0z" />
  </svg>
);
