import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './pages/students/students.component';
import { CsTableModule } from '../lib/components/cs-table/cs-table.module';

@NgModule({
  declarations: [StudentsComponent],
  imports: [CommonModule, StudentsRoutingModule, CsTableModule],
})
export class StudentsModule {}
