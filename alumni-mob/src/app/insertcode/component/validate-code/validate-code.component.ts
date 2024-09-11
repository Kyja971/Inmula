import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-validate-code',
  templateUrl: './validate-code.component.html',
  styleUrls: ['./validate-code.component.scss'],
})
export class ValidateCodeComponent implements OnInit {

  code = Math.floor(Math.random() * 100);

  public validateForm: FormGroup = new FormGroup({});
  constructor(
    private _formBuilder: FormBuilder,
    private _toastController: ToastController,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.validateForm = this._formBuilder.group({
      code: [
        '', // Default value for the control
        [Validators.required],
      ],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.validateForm.value.code === this.code){
      this._router.navigate(['create-password'])
    } else {
      const toast = await this._toastController.create({
        message: "Le code n'est pas bon",
        duration: 5000,
        position: 'middle',
        buttons: [
          {
            text: 'Insérer un nouveau code',
          },
        ],
      });
      await toast.present();
      toast.onWillDismiss().then(() => this.validateForm.reset());
    }
  }
}
