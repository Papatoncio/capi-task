import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false; // Variable para controlar si el formulario fue enviado

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    this.submitted = true; // Establecer 'submitted' a true cuando se intente enviar el formulario

    if (this.registerForm.valid) {
      this.authService
        .register(
          this.registerForm.value.nombre,
          this.registerForm.value.email,
          this.registerForm.value.password
        )
        .subscribe(
          (response) => {
            console.log('Registro exitoso', response);
            this.router.navigate(['/login']);
          },
          (error) => console.error('Error en el registro', error)
        );
    }
  }
}
