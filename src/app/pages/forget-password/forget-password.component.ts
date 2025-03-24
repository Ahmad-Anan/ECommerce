import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  constructor(private authService: AuthService, private router: Router) {}
  private readonly formBuilder = inject(FormBuilder);

  resetSub!: Subscription;
  step: number = 1; // 1: email, 2: code, 3: new password
  msgSuc!: string;
  msgErr!: string;
  loading: boolean = false; 

  verifyEmailForm: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  });
  
  resetCodeForm: FormGroup = this.formBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^\w{6}$/)]],
  });
  
  newPasswordForm: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]], // Ensure email matches
    newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });
  
  searchEmail(): void {
    const emailValue = this.verifyEmailForm.get('email')?.value;
    this.newPasswordForm.get('email')?.patchValue(emailValue);
    if (this.verifyEmailForm.invalid) return;

    this.resetSub = this.authService.setVerifyEmaiL(this.verifyEmailForm.value).subscribe({
      next: (res) => {
        this.msgSuc = res.message;
        this.step = 2; // Move to the next step
      },
      error: (err) => {
        this.msgErr = err.error.message;
      }
    });
  }
  
  sendCode(): void {
    if (this.resetCodeForm.invalid) return;

    this.resetSub = this.authService.setResetCode(this.resetCodeForm.value).subscribe({
      next: (res) => {
        this.msgSuc = res.message;
        this.step = 3; // Move to the next step
      },
      error: (err) => {
        this.msgErr = err.error.message;
      }
    });
  }
  
  resetPassword(): void {
    if (this.newPasswordForm.invalid) return;

    this.resetSub = this.authService.setNewPassword(this.newPasswordForm.value).subscribe({
      next: (res) => {
        this.msgSuc = res.message;
        this.authService.saveDataUser();
        sessionStorage.setItem('token', res.token);
        setTimeout(() => {
          this.router.navigate(['/home']); // Navigate after 1 second
        }, 1000);
      },
      error: (err) => {
        this.msgErr = err.error.message;
      }
    });
  }
}