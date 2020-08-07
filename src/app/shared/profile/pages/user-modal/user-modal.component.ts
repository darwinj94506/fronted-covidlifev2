import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {
  @Input() user;
  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.user);
  }

}
