import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Currency, Title } from '../models/crew.model';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { CrewCeritificatesPopupComponent } from '../crew-ceritificates-popup/crew-ceritificates-popup.component';

@Component({
  selector: 'app-crew-edit',
  templateUrl: './crew-edit.component.html',
  styleUrl: './crew-edit.component.css',
})
export class CrewEditComponent {
  crewForm: FormGroup;
  currencies = Object.values(Currency);
  Currency = Currency;

  titles = Object.values(Title);
  Title = Title;

  certificates: string[] = [];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CrewEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.certificates = data.certificates || [];
    this.crewForm = this.fb.group({
      id: [data.id, Validators.required],
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      nationality: [data.nationality, Validators.required],
      title: [data.title, Validators.required],
      daysOnBoard: [data.daysOnBoard, [Validators.required, Validators.min(1)]],
      dailyRate: [data.dailyRate, [Validators.required, Validators.min(1)]],
      currency: [data.currency, Validators.required],
      totalIncome: [data.totalIncome],
      certificates: [this.certificates],
    });
  }

  onSave(): void {
    if (this.crewForm.invalid) {
      this.crewForm.markAllAsTouched(); // Formu doğrulama ve hata mesajlarını göstermek için işaretler
      return;
    }

    const dailyRate = this.crewForm.get('dailyRate')?.value || 0;
    const daysOnBoard = this.crewForm.get('daysOnBoard')?.value || 0;
    const totalIncome = dailyRate * daysOnBoard;

    this.crewForm.patchValue({ totalIncome });
    this.dialogRef.close(this.crewForm.value);
  }

  openCertificateDialog(certificates: string[]): void {
    this.dialog.open(CrewCeritificatesPopupComponent, {
      data: { certificates },
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
