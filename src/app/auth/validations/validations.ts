import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.value as string;

  if (!password) return null;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const minLength = password.length >= 6;

  const valid = hasUpperCase && hasNumber && hasSpecialChar && minLength;

  return valid ? null : { passwordInvalid: true };
}

export function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const phone = control.value as string;

  // Verifica que el teléfono solo contenga números y tenga al menos 5 caracteres
  const isValidPhone = /^[0-9]+$/.test(phone);

  // Si el teléfono no es válido, devuelve un error
  return isValidPhone ? null : { phoneInvalid: true };
}
