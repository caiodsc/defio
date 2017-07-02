import { Component} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database/database";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'app works!';
  constructor(private db: AngularFireDatabase){
  //const desafios$ = db.list('Desafios');
  //desafios$.subscribe(data=>{
  //  console.log(data);
  //  }
  //)
}
}
