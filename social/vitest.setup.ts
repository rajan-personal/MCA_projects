import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import React from "react";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const {
      alt,
      src,
      width,
      height,
      sizes,
      unoptimized,
      priority,
      loader,
      quality,
      fill,
      ...rest
    } = props as React.ImgHTMLAttributes<HTMLImageElement> & {
      unoptimized?: boolean;
      priority?: boolean;
      loader?: unknown;
      quality?: unknown;
      fill?: boolean;
    };

    const resolvedSrc =
      typeof src === "string"
        ? src
        : typeof src === "object" && src
          ? ((src as { src?: string }).src ?? "")
          : "";

    return React.createElement("img", {
      alt: alt ?? "",
      src: resolvedSrc,
      width,
      height,
      sizes,
      ...rest,
    });
  },
}));

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...rest }: React.PropsWithChildren<{ href: string }>) =>
    React.createElement("a", { href, ...rest }, children),
}));
