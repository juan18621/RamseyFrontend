import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Student } from '../interfaces/student.interface';
import { Observable, delay } from 'rxjs';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private http: HttpClient) {}

  getStudents() {
    return this.http.get(`${baseUrl}/student`).pipe(delay(500)) as any;
  }
}
