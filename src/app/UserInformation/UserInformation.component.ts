import { Component, OnInit } from '@angular/core';
import { UserStorageService } from '../service/storage/user-storage.service';

@Component({
  selector: 'app-UserInformation',
  templateUrl: './UserInformation.component.html',
  styleUrls: ['./UserInformation.component.css']
})
export class UserInformationComponent implements OnInit {
 Name = UserStorageService.getUserName();
 

  constructor() { }

  ngOnInit() {
  }

}
