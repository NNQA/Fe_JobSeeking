import React from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Control, FieldValues } from 'react-hook-form';
import { Input } from '../ui/input';


interface FieldProps {
    label?: string;
    description?: string;
    name: string;
    control: Control<FieldValues>;
    errMess?: boolean; 
}
function Textfield(
    {
        label, 
        description,
        name, 
        control,
        errMess
    } : FieldProps
) {
  return (
    <FormField control={control} name={name} render={
        ({field}) => (
            <FormItem>
                {label ?? <FormLabel>{label}</FormLabel>}
                <FormControl>
                    <Input {...field}></Input>
                </FormControl>
                {description ?? <FormDescription>{description}</FormDescription>}
                <FormMessage></FormMessage>
            </FormItem>
        )
    } ></FormField>
  )
}

export default Textfield