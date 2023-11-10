import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../interfaces/student.interface';
import { CsTableConfig } from 'src/app/lib/components/cs-table/interfaces/cs-table.interface';
import { CsAlertController } from 'src/app/lib/components/cs-alert/services/cs-alert-controller.service';
import { CsPopUpController } from 'src/app/lib/components/cs-pop-up/services/cs-pop-up-controller.service';
import { StudentComponent } from '../../components/student/student.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  studentSub = new Subscription();

  students: Student[] = [];

  loading = false;

  tableConfig: CsTableConfig = {
    hideRowPointer: true,
    pagination: true,
    colDefs: [
      {
        name: 'actions',
        displayName: 'Actions',
        columnTemplateName: 'actions',
      },
      { name: 'id', displayName: 'ID' },
      { name: 'username', displayName: 'Username' },
      { name: 'firstName', displayName: 'First Name' },
      { name: 'lastName', displayName: 'Last Name' },
      { name: 'age', displayName: 'Age' },
      { name: 'career', displayName: 'career' },
    ],
  };

  constructor(
    private studentService: StudentsService,
    private alertController: CsAlertController,
    private popUpController: CsPopUpController
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  async getStudents() {
    this.loading = true;
    this.studentService.getStudents().subscribe((resp: any) => {
      this.loading = false;
      this.students = resp;
    });
  }

  deleteStudent(student: Student) {
    this.alertController.confirmAction({
      confirmFunction: () => {
        this.loading = true;
        this.studentService.deleteStudent(student.id!).subscribe(() => {
          this.loading = false;
          this.getStudents();
        });
      },
    });
  }

  async openStudentForm(student?: Student) {
    const popUp = await this.popUpController.openPopUp({
      component: StudentComponent,
      styles: {
        maxHeight: '450px',
        maxWidth: '450px',
      },
      componentProps: {
        student,
      },
    });

    popUp.popUpClosed().then((data) => {
      if (data) {
        this.alertController.handleSuccess({
          msg: `Student ${data.created ? 'created' : 'updated'}`,
        });
        this.getStudents();
      }
    });
  }
}
