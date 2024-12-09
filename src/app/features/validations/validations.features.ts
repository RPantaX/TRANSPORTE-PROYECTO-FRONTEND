import { AbstractControl, ValidationErrors } from '@angular/forms';


export function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const phone = control.value as string;

  // Verifica que el teléfono solo contenga números y tenga al menos 5 caracteres
  const isValidPhone = /^[0-9]+$/.test(phone);

  // Si el teléfono no es válido, devuelve un error
  return isValidPhone ? null : { phoneInvalid: true };
}
