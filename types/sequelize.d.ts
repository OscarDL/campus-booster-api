export type UnpackChildAttributes<
	ModelName extends string, 
	ModelAttributes extends object
> = Partial<
  Merge<
    ModelAttributes extends { [index in any]: any } ?
      keyof ModelAttributes extends infer Key ?
        Key extends string ? {
          [key in `$${ModelName}.${ReplaceString<
            SQLParseFields<Key>, 
            "$", 
            ""
          >}$`]?: ModelAttributes[Key];
        }
      : never
    : never
  : never>
>;
type UnpackModel<T> = T extends Model<infer A, any> ? A : never;
type ReplaceString<
	T extends string, 
	From extends string, 
	To extends string
> = T extends `${infer Start}${From}${infer End}` ? 
	ReplaceString<`${Start}${To}${End}`, From, To> :
T;
type Merge<T extends object> = {
  [k in AllKeys<T>]: PickType<T, k>;
};
type PickType<T, K extends AllKeys<T>> = T extends { [k in K]?: any }
  ? T[K]
  : undefined;
type AllKeys<T> = T extends any ? keyof T : never;
type SQLParseFields<T extends string> = AlphabeticLowerLoop<T, 0>;
type AlphabeticLowerLoop<T extends string, N extends number> = 
  T extends `${infer Prefix1}.${infer Prefix2}.${infer Prefix3}.${infer Prefix4}.${infer Start}${infer End}` ?
    N extends 25 ?
      T:
    AlphabeticLowerLoop<`${Prefix1}.${Prefix2}.${Prefix3}.${Prefix4}.${Start}${ReplaceString<End, Chars[N], `_${Lowercase<Chars[N]>}`>}`, Increment<N>>
  :
  T extends `${infer Prefix1}.${infer Prefix2}.${infer Prefix3}.${infer Start}${infer End}` ?
    N extends 25 ?
      T:
    AlphabeticLowerLoop<`${Prefix1}.${Prefix2}.${Prefix3}.${Start}${ReplaceString<End, Chars[N], `_${Lowercase<Chars[N]>}`>}`, Increment<N>>
  : T extends `${infer Prefix1}.${infer Prefix2}.${infer Start}${infer End}` ?
    N extends 25 ?
      T:
    AlphabeticLowerLoop<`${Prefix1}.${Prefix2}.${Start}${ReplaceString<End, Chars[N], `_${Lowercase<Chars[N]>}`>}`, Increment<N>>
  : T extends `${infer Prefix1}.${infer Start}${infer End}` ?
    N extends 25 ?
      T:
    AlphabeticLowerLoop<`${Prefix1}.${Start}${ReplaceString<End, Chars[N], `_${Lowercase<Chars[N]>}`>}`, Increment<N>>
  : T extends `${infer Start}${infer End}` ?
    N extends 25 ?
      T:
    AlphabeticLowerLoop<`${Start}${ReplaceString<End, Chars[N], `_${Lowercase<Chars[N]>}`>}`, Increment<N>>
: never;
interface Chars {
  0: "A";
  1: "B";
  2: "C";
  3: "D";
  4: "E";
  5: "F";
  6: "G";
  7: "H";
  8: "I";
  9: "J";
  10: "K";
  11: "L";
  12: "M";
  13: "N";
  14: "O";
  15: "P";
  16: "Q";
  17: "R";
  18: "S";
  19: "T";
  20: "U";
  21: "V";
  22: "W";
  23: "X";
  24: "Y";
  25: "Z";
}
type Increment<N extends number> = [
  1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
  21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,
  38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54, // as far as you need
  ...number[]
][N];