export function CreateObjectLiterals<Type>(obj: { [index: string]: any; }, mood: string, initialValue: any, p0: any) : Type   {
    let emoji=  {...obj}[mood];
    return emoji || initialValue;
}