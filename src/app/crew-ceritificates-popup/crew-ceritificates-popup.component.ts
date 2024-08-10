import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crew-ceritificates-popup',
  templateUrl: './crew-ceritificates-popup.component.html',
  styleUrl: './crew-ceritificates-popup.component.css',
})
export class CrewCeritificatesPopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { certificates: string[] },
    private dialogRef: MatDialogRef<CrewCeritificatesPopupComponent> // Dialog referansı ekledik
  ) {}

  onCloseClick(): void {
    this.dialogRef.close(); // Popup'ı kapatır
  }
}
