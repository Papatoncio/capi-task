import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          localStorage.setItem('authToken', response.token);
          this.toastr.success('Inicio de sesión exitoso!', 'Éxito');
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.toastr.error('Credenciales inválidas', 'Error');
        }
      );
    } else {
      this.toastr.warning(
        'Por favor, complete todos los campos correctamente',
        'Advertencia'
      );
    }
  }
}
