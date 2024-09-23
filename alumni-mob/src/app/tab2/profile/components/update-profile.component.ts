import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InternService } from 'src/app/core/services/intern.service';
import { Intern } from 'src/app/core/types/intern/intern-class';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent  implements OnInit {

  @Input()
  intern!: Intern;

  formUpdateProfile: FormGroup = new FormGroup({});

  constructor(
    private _formBuilder: FormBuilder,
    private _internService: InternService
  ) { }

  ngOnInit() {
    this.formUpdateProfile = this._formBuilder.group({
      firstName: [this.intern?.firstName, [Validators.required]],
      lastName: [this.intern?.lastName, [Validators.required]],
      occupation: [this.intern?.occupation, [Validators.required]],
      company: [this.intern?.company.name, [Validators.required]],
      email: [this.intern?.emails, [Validators.required]],
      phone: [this.intern?.phone, [Validators.required]],
      gender: [this.intern?.gender, [Validators.required]],
      poe: [this.intern?.poe.name, [Validators.required]],
    });

  }

  async onSubmit() {
    const payload = {
      firstname: this.formUpdateProfile.value.firstName,
      lastname: this.formUpdateProfile.value.lastName,
      occupation: this.formUpdateProfile.value.occupation,
      company: { name : this.formUpdateProfile.value.company },
      email: [this.formUpdateProfile.value.email],
      phone: this.formUpdateProfile.value.phone,
      gender: this.formUpdateProfile.value.gender,
      poe: { name : this.formUpdateProfile.value.poe },
    };

    await this._internService.update(payload, this.intern.id)
  }
}