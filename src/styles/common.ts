import { makeVariator } from "@utils/style";

export const TEXT_GRADIENT_PRIMARY =
  "bg-linear-to-br from-gradient-primary-start to-gradient-primary-end bg-clip-text text-transparent";
export const TEXT_GRADIENT_SECONDARY =
  "bg-linear-to-br from-gradient-secondary-start to-gradient-secondary-end bg-clip-text text-transparent";

export const borderGradient = makeVariator(
  {
    primary: {
      base: "from-gradient-primary-start to-gradient-primary-end",
      bgColor: {
        primary: "[--tw-border-gradient-background:#f4f4f5] dark:[--tw-border-gradient-background:#18181b]",
      },
    },
    secondary: {
      base: "from-gradient-secondary-start to-gradient-secondary-end",
      bgColor: {
        primary: "[--tw-border-gradient-background:#f4f4f5] dark:[--tw-border-gradient-background:#18181b]",
      },
    },
    warning: {
      base: "from-gradient-warning-start to-gradient-warning-end",
      bgColor: {
        primary: "[--tw-border-gradient-background:#f4f4f5] dark:[--tw-border-gradient-background:#18181b]",
      },
    },
  },
  "border-solid bg-origin-border border-transparent [background-clip:padding-box,border-box] bg-[linear-gradient(var(--tw-border-gradient-background),var(--tw-border-gradient-background)),linear-gradient(to_bottom_right,var(--tw-gradient-from),var(--tw-gradient-to))]",
);

export const BORDER_GRADIENT_PRIMARY_XL =
  "xl:bg-origin-border xl:border-transparent xl:[--tw-border-gradient-background:var(--color-primary)] xl:dark:[--tw-border-gradient-background:var(--color-primary)] xl:[background-clip:padding-box,border-box] xl:bg-[linear-gradient(var(--tw-border-gradient-background),var(--tw-border-gradient-background)),linear-gradient(to_bottom_right,var(--tw-gradient-from),var(--tw-gradient-to))]";
