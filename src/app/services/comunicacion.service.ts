import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  currentUser : BehaviorSubject<IUser> = new BehaviorSubject<IUser>({username:'', password: ''});
  currentCategory: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }


  setCurrentUser(user: IUser){
    this.currentUser.next(user);
  }

  getCurrenUser(){
    return this.currentUser.asObservable();
  }

  setCurrentCategory(category: string){
    this.currentCategory.next(category);
  }

  getCurrentCategory(){
    return this.currentCategory.asObservable();
  }
}
