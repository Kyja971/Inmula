import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { InternService } from 'src/app/core/services/intern.service';
import { Intern } from 'src/app/core/types/intern/intern-class';

@Component({
  selector: 'app-interns',
  templateUrl: './interns.component.html',
  styleUrls: ['./interns.component.scss'],
})
export class InternsComponent  implements OnInit, OnDestroy {

  public interns: Array<Intern> = []

  private _subscription!: Subscription

  constructor(
    private _internService: InternService
  ) { }

  ngOnInit(): void {
    this._subscription = this._internService.findAll().subscribe({
      next: (interns: Array<Intern>) => {
        this.interns = interns
      },
      error: (error: any) => {},
      complete: () => {}
    })
  }


  findOne(internId?: string): Intern | null {
    if(!internId){
      return null
    } else {
      this._subscription = this._internService.findOne(internId).subscribe({
        next: (intern: Intern) => {
          return intern
        },
        error: (error: any) => {},
        complete: () => {}
      })
    }
    return null
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    if(query.trim() !== ''){
      this.interns = this.interns.filter((intern: Intern) => (intern.firstName.toLowerCase().indexOf(query) > -1 || intern.lastName.toLowerCase().indexOf(query) > -1));
    }else{
      this.handleClear();
    }
  }

  handleClear(){
    this._internService.findAll().pipe(take(1)).subscribe({
      next: (interns: Array<Intern>) => {
        this.interns = interns
      },
      error: (error: any) => {},
      complete: () => {}
    });
  }

}
