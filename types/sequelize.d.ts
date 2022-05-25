export type UnpackChildAttributes<
	ModelName extends string, 
	ModelAttributes extends object
> = Partial<
  Merge<
    ModelAttributes extends { [index in any]: any } ?
      keyof ModelAttributes extends infer Key ?
        Key extends string ? {
          [key in `$${ModelName}.${ReplaceString<Key, "$", "">}$`]?: ModelAttributes[Key];
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