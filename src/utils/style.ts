import { twMerge } from "tailwind-merge";

type Variants<TProps extends Record<string, Record<string, string>>> = Record<
  string,
  { base: string } | Partial<TProps>
>;

export type GetPropKeys<
  TVariants extends Variants<Record<string, Record<string, string>>>,
> = Exclude<
  { [TKey in keyof TVariants]: keyof TVariants[TKey] }[keyof TVariants],
  "base"
>;

export type Variator<
  TVariants extends Variants<Record<string, Record<string, string>>>,
> = ((
  className?: string | null,
  props?: { variant?: keyof TVariants } & {
    [TPropKey in GetPropKeys<TVariants>]?: {
      [TVariantKey in keyof TVariants]: keyof TVariants[TVariantKey][TPropKey];
    }[keyof TVariants];
  },
) => string) & { variants: TVariants; base: string };

export function makeVariator<
  TVariants extends Variants<Record<string, Record<string, string>>>,
>(variants: TVariants, base?: string): Variator<TVariants> {
  const variator: Variator<TVariants> = function (className, props) {
    const variant = props?.variant ? variants?.[props.variant] : undefined;
    const propClasses: string[] = [];

    for (const [propKey, propVariantKey] of variant && props
      ? Object.entries(props)
      : []) {
      if (propKey === "variant") {
        continue;
      }

      const prop = variant![propKey as GetPropKeys<TVariants>] as
        | Record<string, string>
        | undefined;
      const propVariant = prop?.[propVariantKey as string];

      if (!propVariant) {
        continue;
      }

      propClasses.push(propVariant);
    }

    return twMerge(
      base ?? "",
      (variant?.base as string | undefined) ?? "",
      ...propClasses,
      className ?? "",
    );
  };

  variator.variants = variants ?? {};
  variator.base = base ?? "";

  return variator;
}

export type GetVariants<
  TVariator extends Variator<Variants<Record<string, Record<string, string>>>>,
> = Exclude<Parameters<TVariator>[1], undefined>;
