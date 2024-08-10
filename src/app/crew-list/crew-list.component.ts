import { Component, ElementRef, ViewChild } from '@angular/core';
import { Crew } from '../models/crew.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { CrewService } from '../services/crew.service';
import { CrewEditComponent } from '../crew-edit/crew-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-crew-list',
  templateUrl: './crew-list.component.html',
  styleUrl: './crew-list.component.css',
})
export class CrewListComponent {
  crewList: Crew[] = [];
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'nationality',
    'title',
    'daysOnBoard',
    'dailyRate',
    'currency',
    'discount',
    'totalIncome',
    'actions',
  ];
  dataSource = new MatTableDataSource<Crew>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input!: ElementRef;

  constructor(
    private crewService: CrewService,
    private translate: TranslateService,
    public dialog: MatDialog
  ) {}
  applyDiscount(index: number): void {
    const crew = this.dataSource.data[index];
    const discount = crew.discount || 0;
    crew.totalIncome =
      crew.dailyRate * crew.daysOnBoard -
      (crew.dailyRate * crew.daysOnBoard * discount) / 100;
    this.dataSource.data = [...this.dataSource.data];
  }
  ngOnInit() {
    this.loadCrewData();
  }
  get totalIncomeSumUSD(): number {
    return this.crewList
      .filter((crew) => crew.currency === 'USD')
      .reduce((sum, crew) => sum + crew.totalIncome, 0);
  }

  get totalIncomeSumEUR(): number {
    return this.crewList
      .filter((crew) => crew.currency === 'EUR')
      .reduce((sum, crew) => sum + crew.totalIncome, 0);
  }
  ngAfterViewInit() {
    // Ensure paginator and sort are set after view is initialized
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
  loadCrewData() {
    // Get the crew data from the service
    const crewData = this.crewService.getCrewList();
    this.dataSource.data = crewData;

    // Ensure paginator and sort are set after data is loaded
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    this.crewList = this.crewService.getCrewList();
  }

  openEditCrewDialog(crew: Crew, index: number): void {
    const dialogRef = this.dialog.open(CrewEditComponent, {
      width: '400px',
      data: crew,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.crewService.updateCrew(index, result);
        this.loadCrewData(); // Refresh data
      }
    });
  }
  deleteCrew(id: number): void {
    console.log('Deleting crew with id:', id); // Debug: Hangi id siliniyor
    this.crewService.deleteCrew(id);
    this.loadCrewData(); // Refresh data
    console.log('Crew deleted with id:', id); // Debug: Silme sonrası id
  }
}
