import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../interfaces/student.interface';
import { CsTableConfig } from 'src/app/lib/components/cs-table/interfaces/cs-table.interface';

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

  constructor(private studentService: StudentsService) {}

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
}
