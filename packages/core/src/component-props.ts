import { ComponentPropsWithRef, ElementType } from "react";

export type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends any
  ? Omit<T, TOmitted>
  : never;

export type ComponentProps<
  T extends ElementType,
  D extends ElementType,
  P
> = P &
  DistributiveOmit<ComponentPropsWithRef<ElementType extends T ? D : T>, "as">;
