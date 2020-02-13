import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {CommonService} from "../../service/common.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: CommonService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<LoginComponent>,
  ) {

  }

  public username = new FormControl('', [
    Validators.required,
  ]);

  public password = new FormControl('', [
    Validators.required,
  ]);

  public loginFormControl = this.fb.group({
    username: this.username,
    password: this.password
  });


  onSubmit() {

    if (this.loginFormControl.valid) {
      const {username, password} = this.loginFormControl.value;

      this.service.login(username, password).subscribe(
        resp => {
          if (resp.status === 1000) {
            console.log(resp.data);
            alert('登录成功');
            this.dialogRef.close();
            localStorage.setItem("userId", resp.data.uid);
            this.service.userId = resp.data.uid;

          } else {
            alert(resp.message);
          }
        }
      )
    }
    console.log(this.loginFormControl.value)
  }


  ngOnInit() {

  }

}
