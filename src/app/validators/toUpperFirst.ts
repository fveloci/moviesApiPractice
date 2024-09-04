import { AbstractControl, ValidatorFn } from "@angular/forms";

export function firstCharacterUppercase(): ValidatorFn {
    return (control: AbstractControl) => {
        const value = <string> control.value;
        if (!value || value.length === 0) return null;
        const firstChar = value[0];
        if(firstChar !== firstChar[0].toUpperCase()) {
            return {
                firstCharacterUppercase: {
                    message: 'La primer letra debe ser mayúscula'
                }
            }
        }
        return null;
    }
}