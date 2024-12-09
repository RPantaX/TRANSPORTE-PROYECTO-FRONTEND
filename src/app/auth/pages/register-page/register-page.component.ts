import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { passwordValidator, phoneValidator } from '../../validations/validations';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  public userForm: FormGroup;
  public errorMessage: string | null = null;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.userForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      phone: ['', [Validators.minLength(5), phoneValidator]],
      isAuth:[false],
      password: ['', [Validators.required, Validators.minLength(6), passwordValidator]],
    });
  }
  get usernameControl() {
    return this.userForm.get('username');
  }

  get passwordControl() {
    return this.userForm.get('password');
  }
  get phoneControl(){
    return this.userForm.get('phone')
  }
  onRegister(): void {
    this.errorMessage = null;
    if (this.userForm.invalid) {
      return;
    }
    const user = this.userForm.value as User
    console.log(user);
    this.authService.register(user)
    .subscribe({
      next: () => this.router.navigate(['/home']), // Navega solo si el login fue exitoso
      error: (err) => {
        console.error('Error en el login:', err);
        this.errorMessage = err.message?.message || 'Usuario  ya existe';
      }
    })

  }
}
