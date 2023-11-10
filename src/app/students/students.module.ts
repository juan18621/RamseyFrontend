import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './pages/students/students.component';
import { CsTableModule } from '../lib/components/cs-table/cs-table.module';
import { StudentComponent } from './components/student/student.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CsInputModule } from '../lib/components/cs-input/cs-input.module';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';
import { CsSkeletonLoadingModule } from '../lib/components/cs-skeleton-loading/cs-skeleton-loading.module';

@NgModule({
  declarations: [StudentsComponent, StudentComponent, StudentDetailComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    CsTableModule,
    ReactiveFormsModule,
    CsInputModule,
    CsSkeletonLoadingModule,
  ],
})
export class StudentsModule {}
