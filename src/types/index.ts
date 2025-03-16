type Nullable<T> = T | null | undefined;

type NullableString = Nullable<string>;
type NullableNumber = Nullable<number>;
type NullableStringOrNumber = Nullable<string | number>;
type NullableBoolean = Nullable<boolean>;
type NullableHTMLElement = Nullable<HTMLElement>;

export type {
  Nullable,
  NullableString,
  NullableNumber,
  NullableStringOrNumber,
  NullableBoolean,
  NullableHTMLElement,
};
