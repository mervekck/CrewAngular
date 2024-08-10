import { Injectable } from '@angular/core';
import { Crew, Currency } from '../models/crew.model';

@Injectable({
  providedIn: 'root',
})
export class CrewService {
  private crewList: Crew[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      nationality: 'American',
      title: 'Captain',
      daysOnBoard: 120,
      dailyRate: 300,
      currency: Currency.USD,
      totalIncome: 36000,
      certificates: [
        'Safety',
        'Navigation',
        'First Aid',
        'Leadership',
        'Emergency Response',
      ],
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      nationality: 'British',
      title: 'Engineer',
      daysOnBoard: 150,
      dailyRate: 250,
      currency: Currency.USD,
      totalIncome: 37500,
      certificates: [
        'Engineering',
        'Safety',
        'Communication',
        'Project Management',
        'Advanced Mechanics',
      ],
    },
    {
      id: 3,
      firstName: 'Carlos',
      lastName: 'Mendez',
      nationality: 'Spanish',
      title: 'Cooker',
      daysOnBoard: 200,
      dailyRate: 150,
      currency: Currency.EUR,
      totalIncome: 30000,
      certificates: [
        'Cooking',
        'Safety',
        'Hygiene',
        'Nutritional Science',
        'Food Safety',
      ],
    },
    {
      id: 4,
      firstName: 'Marie',
      lastName: 'Dupont',
      nationality: 'French',
      title: 'Mechanic',
      daysOnBoard: 180,
      dailyRate: 220,
      currency: Currency.EUR,
      totalIncome: 39600,
      certificates: [
        'Mechanics',
        'Safety',
        'Engineering',
        'Hydraulics',
        'Electrical Systems',
      ],
    },
    {
      id: 5,
      firstName: 'Lars',
      lastName: 'Hansen',
      nationality: 'Danish',
      title: 'Captain',
      daysOnBoard: 130,
      dailyRate: 320,
      currency: Currency.USD,
      totalIncome: 41600,
      certificates: [
        'Safety',
        'Navigation',
        'Leadership',
        'Crisis Management',
        'Team Building',
      ],
    },
  ];

  getCrewList(): Crew[] {
    return this.crewList;
  }
  updateCrew(index: number, updatedCrew: Crew) {
    this.crewList[index] = updatedCrew;
  }
  deleteCrew(id: number): void {
    const index = this.crewList.findIndex((crew) => crew.id === id);
    if (index > -1) {
      console.log('Deleting crew with id:', id); // Debug: Hangi id siliniyor
      this.crewList.splice(index, 1);
      console.log('Updated crew list:', this.crewList); // Debug: Güncellenmiş liste
    } else {
      console.error('Invalid id for deletion:', id); // Debug: Geçersiz id
    }
  }
  addCrew(crew: Crew) {
    // Mevcut listede en yüksek ID'yi bul
    const maxId = this.crewList.reduce(
      (max, c) => (c.id > max ? c.id : max),
      0
    );

    // Yeni eklenen crew'e ID atama
    crew.id = maxId + 1;

    // Tayfa ekleme
    this.crewList.push(crew);
  }
}
