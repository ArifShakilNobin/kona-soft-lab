import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { delay } from "rxjs/internal/operators/delay";
import { AuthenticationService } from "src/app/service/authentication.service";
import { Login } from "./login";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  login!: Login;

  token: any;
  hide = true;

  constructor(
    private fb: FormBuilder,
    // private notification: NotificationService,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.getToken();
  }

  ngOnInit() {

    this.loginForm = this.fb.group({
      username: [null],
      password: [null],
    });
  }

  getToken() {
    this.authService.getToken().subscribe((res: any) => {
      this.token = res.request_token;
      console.log(this.token);
    });
  }

  submitLoginForm(): void {
    let login = new Login();

    login.username = this.loginForm.get('username').value;
    login.password = this.loginForm.get('password').value;
    login.request_token = this.token;

    this.authService.login(login).subscribe({
      next: (response) => {
        // this.notification.showSuccess("User login successful", "Success")
        // localStorage.setItem('currentUser', JSON.stringify({ token: this.token }));
        
        this.router.navigate(["/home"]);
      },
      error: (err) => {
        // this.notification.showError("Invalid username or password.", "Error")
        console.error(err)
      },
      complete: () => console.info('Login complete')
    });
    
  }



}
