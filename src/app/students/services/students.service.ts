import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Student } from '../interfaces/student.interface';
import { delay } from 'rxjs';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  getStudents() {
    return this.http.get(`${baseUrl}/student`).pipe(delay(500));
  }

  getStudentById(id: string) {
    return this.http.get(`${baseUrl}/student/${id}`);
  }

  createStudent(student: Student) {
    return this.http.post(`${baseUrl}/student`, student);
  }

  updateStudent(student: Student, id: number) {
    return this.http.put(`${baseUrl}/student/${id}`, student);
  }

  deleteStudent(id: number) {
    return this.http.delete(`${baseUrl}/student/${id}`);
  }
}
