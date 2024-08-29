import { Component, OnInit } from '@angular/core';
import { InternService } from '../core/services/intern.service';
import { take } from 'rxjs';
import { Intern } from '../core/types/intern/intern-class';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  public interns: Array<Intern> = []

  constructor(
    private _service: InternService,
  ) {}

  ngOnInit(): void {
    this._service.findAll()
      .pipe(
        take(1)
      )
      .subscribe({
        next: (results: any) => {
          this.interns = results
        },
        error: (error: any) => {}
      })
  }

  onCancel(): void {
    return
  }
}