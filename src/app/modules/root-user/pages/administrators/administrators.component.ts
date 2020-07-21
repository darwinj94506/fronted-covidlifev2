import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { IUser } from '../../../../core/domain/entities';
import { Observable } from 'rxjs';
//
import {Apollo} from 'apollo-angular';



//

@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
  styleUrls: ['./administrators.component.css']
})
export class AdministratorsComponent implements OnInit {

    page = 1;
    pageSize = 7;

    userList: Observable<any[]> = this.userService.getUsers();
    config: any;
    editUser: FormGroup;
    userDetail: any = null;

    filterArray: Observable<any[]>;
    joiningDate: string;

    data: Observable<any>;

    constructor(private userService: UserService, private fb: FormBuilder,
         private modalService: NgbModal, private datePipe: DatePipe, private apollo: Apollo) {
        this.filterArray = this.userList;
    }

    ngOnInit() {
      
        this.editUser = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
            role: ['', Validators.required],           
        });
    }


    _searchTerm: string;
    get searchTerm(): string {
        return this._searchTerm;
    }
    set searchTerm(val: string) {
        // this._searchTerm = val;
        // this.filterArray = this.filter(val);
    }

    filter(v: string) {
        // return this.userList.filter(x => x.Name.toLowerCase().indexOf(v.toLowerCase()) !== -1 || x.Email.toLowerCase().indexOf(v.toLowerCase()) !== -1);
    }

    deleteUser(id: number): void {
        // this.filterArray = this.filterArray.filter(user => user.id !== id);
    }


    logValidationErrors(group: FormGroup) {
        Object.keys(group.controls).forEach((key: string) => {
            const ac = group.get(key);

            this.formsErrors[key] = '';
            if (ac && !ac.valid && (ac.touched || ac.dirty)) {
                const message = this.ValidationMessage[key];
                for (const errorKey in ac.errors) {
                    if (errorKey) {
                        this.formsErrors[key] += message[errorKey] + '    ';
                    }
                }
            }
            if (ac instanceof FormGroup) {
                this.logValidationErrors(ac)
            }
        })
    }

    ValidationMessage = {
        name: { required: 'Name is required.' },
        lastname: { required: 'Position is required.' },
        email: { required: 'Email is required.' },
        role: { required: 'Mobile is required.' },
    }

    formsErrors = {
    }




    openModal(targetModal, user:any) {
        this.modalService.open(targetModal, {
            centered: true,
            backdrop: 'static'
        });


        if (user != null) {
            //this.joiningDate=user.DateOfJoining;
            // this.joiningDate = this.datePipe.transform(new Date(user.DateOfJoining), 'yyyy-MM-dd');

            this.userDetail = user;
            this.editUser.patchValue({
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                role: user.role
            });
        }

    }


    onSubmit() {
        if (this.userDetail != null) {
            // const index = this.userService.getUser().indexOf(this.userDetail);
            this.userDetail.name = this.editUser.get('name').value;
            this.userDetail.lastname = this.editUser.get('lastname').value;
            this.userDetail.email = this.editUser.get('email').value;
            this.userDetail.role = this.editUser.get('role').value;

            // this.userService.getUser()[index] = this.userDetail;
        }
        else {
            
            this.userDetail.name = this.editUser.get('name').value;
            this.userDetail.lastname = this.editUser.get('lastname').value;
            this.userDetail.email = this.editUser.get('email').value;
            this.userDetail.role = this.editUser.get('role').value;

            // this.userDetail.Name = this.editUser.get('Name').value;
            // this.userDetail.Position = this.editUser.get('Position').value;
            // this.userDetail.Email = this.editUser.get('Email').value;
            // this.userDetail.Mobile = this.editUser.get('Mobile').value;
            // this.userDetail.DateOfJoining = new Date();
            // this.userDetail.Salary = this.editUser.get('Salary').value;
            // this.userDetail.Projects = this.editUser.get('Projects').value;
            // this.userDetail.imagePath = "assets/images/users/7.jpg";
            // this.filterArray.push(this.userDetail)


        }
        this.modalService.dismissAll();
        this.userDetail = null;

        this.joiningDate = '';
        this.ngOnInit();

    }


    closeBtnClick() {
        this.modalService.dismissAll()
        this.ngOnInit();
    }

}
