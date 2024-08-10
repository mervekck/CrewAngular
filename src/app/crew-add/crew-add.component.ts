import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Currency, Title } from '../models/crew.model';

@Component({
  selector: 'app-crew-add',
  templateUrl: './crew-add.component.html',
  styleUrl: './crew-add.component.css',
})
export class CrewAddComponent {
  crewForm: FormGroup;
  currencies = Object.values(Currency);
  Currency = Currency;
  titles = Object.values(Title); // Enum değerlerini alın
  certificates = [
    'Safety',
    'Navigation',
    'First Aid',
    'Leadership',
    'Emergency Response',
    'Engineering',
    'Communication',
    'Project Management',
    'Advanced Mechanics',
    'Hygiene',
    'Nutritional Science',
    'Food Safety',
    'Hydraulics',
    'Electrical Systems',
  ];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CrewAddComponent>
  ) {
    this.crewForm = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nationality: ['', Validators.required],
      title: ['', Validators.required],
      daysOnBoard: [0, [Validators.required, Validators.min(1)]],
      dailyRate: [0, [Validators.required, Validators.min(1)]],
      currency: [Currency.USD, Validators.required],
      totalIncome: [0],
      certificates: [[], Validators.required],
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

  onCancel(): void {
    this.dialogRef.close();
  }
}
