import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../shared/security/auth.service";
import {AuthInfo} from "../shared/security/auth-info";
import {AngularFireDatabase} from "angularfire2/database/database";
import {Subject} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private db: AngularFireDatabase) { }
  erroRegister = false;
  erroRegisterMsg = '';
  erroLogin = false;
  erroLoginMsg = '';
  spinnerRS = false;
  authInfo: AuthInfo;
  finishedRS = false;
  user = {
    nome: '',
    image: ''
  };
  ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo => this.authInfo = authInfo);
  }


  onSignUp(form: NgForm){
    const nameR = form.value.nameR;
    const emailR = form.value.emailR;
    const formR = form;
    const passwordR = form.value.passwordR;
    this.erroRegister = false;
    this.spinnerRS = true;
    this.authService.signUp(emailR, passwordR).subscribe(
      ()=>{
         document.getElementById('closeR').click();
         this.user['nome'] = nameR;
         this.user['image'] = 'assets/icones/unknown3x.png';
         this.finishedRS = true;
         setTimeout(()=>{
           this.showSnack('Register');
         }, 500);
         this.afterRegister();
      }, err=>{
        this.spinnerRS = false;
        this.erroRegisterMsg = err;
        this.erroRegister = true;
      }
    );


  }

  onSignIn(form: NgForm){

    const emailS = form.value.emailS;
    const passwordS = form.value.passwordS;
    this.erroLogin = false;
    this.spinnerRS = true;
    this.authService.logIn(emailS, passwordS).subscribe(
      ()=>{
          this.afterLogin();
        }, err=>{
          this.spinnerRS = false;
          this.erroLoginMsg = err;
          this.erroLogin = true;
        }
      );
  }
  showSnack(r) {
    const that = this;
    var x = document.getElementById('snackbar'+r);
    setTimeout(function(){
      x.className = "show";
      that.spinnerRS = false;
    },500);
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3500);
  }
  afterLogin(){
    //console.log(this.authInfo.$uid);
    this.db.object('Usuarios/' + this.authInfo.$uid)
      .subscribe(
        data => {
          this.user = data;
          if(this.authInfo.isLoggedIn()){
            this.finishedRS = true;
            document.getElementById('closeS').click();
            this.showSnack('Login');
          }
        }, err=> {
          this.spinnerRS = false;
          this.erroLoginMsg = err;
          this.erroLogin = true;
        }
      );
  }


  afterRegister(){
    const usuario$ = this.db.object('Usuarios/' + this.authInfo.$uid);
    usuario$.set(this.user).then(
      ()=> console.log('Push done', this.authInfo.$uid),
      console.error
    );
  }
  logout(){
    this.authService.logOut();
    this.finishedRS = false;
    this.showSnack('Logout');
  }
}

