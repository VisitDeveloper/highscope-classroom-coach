// p0: any
export function CreateObjectLiterals<Type>(obj: { [index: string]: any; }, mood: string, initialValue: any ) : Type   {
    let emoji=  {...obj}[mood];
    return emoji || initialValue;
}