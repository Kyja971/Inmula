import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs';
import { InternService } from 'src/app/core/services/intern.service';
import { Intern } from 'src/app/core/types/intern/intern-class';

@Component({
  selector: 'app-show-likes',
  templateUrl: './show-likes.component.html',
  styleUrls: ['./show-likes.component.scss'],
})
export class ShowLikesComponent  implements OnInit {

  @Input()
  internsId!: string[]

  interns: Intern[] = []


  constructor(
    private _modalController: ModalController,
    private _internService: InternService
  ) { }

  ngOnInit() {
    if(this.internsId.length !== 0){
      this.internsId.forEach((internId: string) => {
        this._internService.findOne(internId).pipe(take(1)).subscribe((intern: Intern) => {
          this.interns.push(intern)
        })
      })
    }
  }

  goBack(){
    this._modalController.dismiss()
  }

}
