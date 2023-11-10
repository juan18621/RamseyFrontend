import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../../interfaces/student.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { CsPopUpController } from 'src/app/lib/components/cs-pop-up/services/cs-pop-up-controller.service';
import { StudentsService } from '../../services/students.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  @Input('student') set studentHandler(student: Student) {
    this.student = student;
    this.setStudent();
  }

  @Input() fromDetail = false;

  student?: Student;

  studentForm = this.formBuilder.group({
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    age: [0, Validators.required],
    career: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private popUpController: CsPopUpController,
    private studentsService: StudentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setStudent();
  }

  setStudent() {
    if (this.student) {
      this.studentForm.patchValue(this.student);
    }
  }

  submit() {
    if (this.studentForm.invalid) {
      return this.studentForm.markAllAsTouched();
    }

    if (this.student) {
      this.updateStudent();
    } else {
      this.createStudent();
    }
  }

  createStudent() {
    this.studentsService
      .createStudent(this.studentForm.value as Student)
      .subscribe((resp) => {
        this.close({ created: true });
      });
  }

  updateStudent() {
    const student = {
      id: this.student!.id,
      ...(this.studentForm.value as Student),
    };
    this.studentsService
      .updateStudent(student, student!.id!)
      .subscribe((resp) => {
        this.close({ updated: true });
      });
  }

  close(data?: { created?: boolean; updated?: boolean }) {
    this.popUpController.closePopUp(data);
    if (this.fromDetail) {
      this.router.navigateByUrl('');
    }
  }
}
