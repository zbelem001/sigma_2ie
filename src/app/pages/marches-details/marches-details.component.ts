import { Component } from '@angular/core';
import { TransformationService } from '../../services/transformation.service';

@Component({
  selector: 'app-marches-details',
  templateUrl: './marches-details.component.html',
  styleUrls: ['./marches-details.component.css'],
  standalone: false
})
export class MarchesDetailsComponent {
  activeSection: 'lots' | 'soumissions' | 'documents' | 'attributions' = 'lots';
  currentMarket = 'M-2023-0045';

  constructor(public transformation: TransformationService) {}

  get marketLots() {
    return this.transformation.lotList.filter((lot) => lot.numbMarche === this.currentMarket);
  }

  get marketConsultations() {
    return this.transformation.consultationList.filter((consultation) =>
      this.marketLots.some((lot) => lot.numbLot === consultation.numbLot)
    );
  }

  get marketSoumissions() {
    return this.transformation.soumissionList.filter((soumission) =>
      this.marketLots.some((lot) => lot.numbLot === soumission.numbLot)
    );
  }

  get marketDocuments() {
    return this.transformation.documentList.filter((document) =>
      this.marketLots.some((lot) => lot.numbLot === document.numbLot)
    );
  }

  get marketAttributions() {
    return this.transformation.attributaireList.filter((attribution) =>
      this.marketSoumissions.some((soumission) => soumission.idSoumission === attribution.idSoumissionAttribuee)
    );
  }

  get marketAvenants() {
    return this.transformation.avenantList.filter((avenant) =>
      this.marketAttributions.some((attribution) => attribution.idSoumissionAttribuee === avenant.idSoumissionAttribuee)
    );
  }
}
