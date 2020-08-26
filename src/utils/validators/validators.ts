export type ValidatorType =  (value: string)=> string | undefined


export const requiredField: ValidatorType =(value)=>{
if(value) return undefined
    return "Field is required"
}

export const maxLengthCreator= (length: number): ValidatorType => (value) =>{
    if(value && value.length >length) return `Max length is ${length} symbols`
    return undefined
}