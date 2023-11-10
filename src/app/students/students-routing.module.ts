import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './pages/students/students.component';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
  },
  {
    path: 'detail/:id',
    component: StudentDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
