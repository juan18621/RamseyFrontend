import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../interfaces/student.interface';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetailComponent implements OnInit {
  student!: Student;
  loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.getStudent(id);
  }

  getStudent(id: string) {
    this.loading = true;
    this.studentsService.getStudentById(id).subscribe((resp: any) => {
      this.student = resp;
    });
  }
}
