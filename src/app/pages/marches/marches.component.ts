import { Component } from '@angular/core';
import { Marche, TransformationService } from '../../services/transformation.service';

@Component({
  selector: 'app-marches',
  templateUrl: './marches.component.html',
  styleUrls: ['./marches.component.css'],
  standalone: false
})
export class MarchesComponent {
  constructor(public transformation: TransformationService) {}

  get markets(): Marche[] {
    return this.transformation.marcheList;
  }

  lotCount(marche: Marche): number {
    return this.transformation.lotList.filter((lot) => lot.numbMarche === marche.numbMarche).length;
  }
}
