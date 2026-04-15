import { Component } from '@angular/core';
import { Marche, TransformationService } from '../../services/transformation.service';

@Component({
  selector: 'app-marches',
  templateUrl: './marches.component.html',
  styleUrls: ['./marches.component.css'],
  standalone: false
})
export class MarchesComponent {
  showNewMarketForm = false;

  newMarket: Omit<Marche, 'statut'> = {
    numbMarche: '',
    description: '',
    nombreLot: 1,
    natureOuverture: '',
    dateEnregistrement: '',
    financement: '',
    modePassation: '',
    demandeur: '',
    responsableSuivi: '',
    sctPersons: ['', '', '', ''],
    datePrevReception: ''
  };

  constructor(public transformation: TransformationService) {}

  get markets(): Marche[] {
    return this.transformation.marcheList;
  }

  lotCount(marche: Marche): number {
    return this.transformation.lotList.filter((lot) => lot.numbMarche === marche.numbMarche).length;
  }

  toggleNewMarketForm(): void {
    this.showNewMarketForm = !this.showNewMarketForm;
  }

  submitNewMarket(): void {
    try {
      const sctPersons = this.newMarket.sctPersons.map((person) => person?.trim()).filter(Boolean);
      this.transformation.addMarche({ ...this.newMarket, sctPersons });
      this.newMarket = {
        numbMarche: '',
        description: '',
        nombreLot: 1,
        natureOuverture: '',
        dateEnregistrement: '',
        financement: '',
        modePassation: '',
        demandeur: '',
        responsableSuivi: '',
        sctPersons: ['', '', '', ''],
        datePrevReception: ''
      };
      this.showNewMarketForm = false;
    } catch (error) {
      console.error(error);
      this.showNewMarketForm = false;
    }
  }
}
