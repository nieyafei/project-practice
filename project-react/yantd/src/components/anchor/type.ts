import React from "react";

export interface YantAnchor {
  registerLink: (link: string) => void;
  unregisterLink: (link: string) => void;
  activeLink: string | null;
  scrollTo: (link: string) => void;
  onClick?: (
    e: React.MouseEvent<HTMLElement>,
    link: { title: React.ReactNode; href: string },
  ) => void;
}

export interface AnchorState {
  activeLink: null | string;
}

export type AnchorContainer = HTMLElement | Window;