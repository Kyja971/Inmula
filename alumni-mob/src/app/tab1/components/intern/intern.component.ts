import { Component, Input, OnInit } from '@angular/core';
import { InternType } from 'src/app/core/types/intern/intern-type';
import { PostType } from 'src/app/core/types/post/post-type';

@Component({
  selector: 'app-intern',
  templateUrl: './intern.component.html',
  styleUrls: ['./intern.component.scss'],
})
export class InternComponent  implements OnInit {
  @Input()
  intern!: InternType

  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void{}

}
