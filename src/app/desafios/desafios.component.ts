import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database/database";

@Component({
  selector: 'app-desafios',
  templateUrl: './desafios.component.html',
  styleUrls: ['./desafios.component.css']
})
export class DesafiosComponent implements OnInit {
  desafios: any;
  r: boolean = false;
  constructor(private db: AngularFireDatabase) {
    const desafios$ = db.list('Desafios', {
      query:{
        limitToFirst: 5
      }

    });
    desafios$.subscribe(
      data => {
        this.r = true;
        this.desafios = data;
        console.log(this.desafios);
      }
    );
  }

  ngOnInit() {

  }


}
