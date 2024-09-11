import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthType } from 'src/app/core/types/auth/auth.type';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss'],
})
export class AddAccountComponent  implements OnInit {

  form: FormGroup = new FormGroup({});

  @Input()
  auth?: AuthType;

  constructor(
    private _formBuilder: FormBuilder,
    private _modalController : ModalController,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      email: [
        this.auth?.email, // Default value for the control
        [Validators.required],
      ],
      role: [this.auth?.role, [Validators.required]],
    });
  }

  onSubmit() {
    const payload = {
      email: this.form.value.email,
      role: this.form.value.role,
    };
    if(this.auth){
      this._authService.update(this.auth?.id, payload)
    }else{
      this._authService.add(payload)
    }
  }

  goBack(){
    this._modalController.dismiss()
  }
}