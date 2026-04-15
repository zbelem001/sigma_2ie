import { Component } from '@angular/core';
import { Fournisseur, TransformationService } from '../../services/transformation.service';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.css'],
  standalone: false
})
export class FournisseursComponent {
  showNewSupplierForm = false;

  newSupplier: Fournisseur = {
    idFournisseur: '',
    raisonSociale: '',
    domaineActivite: '',
    disposeIFU_RCCM: false,
    numIFU_RCCM: '',
    emailTel: '',
    nomPrenomRepr: '',
    statutFourn: 'Externe'
  };

  constructor(public transformation: TransformationService) {}

  get totalSuppliers(): number {
    return this.transformation.fournisseurList.length;
  }

  get uniqueDomains(): number {
    return new Set(this.transformation.fournisseurList.map((f) => f.domaineActivite)).size;
  }

  get activeExternal(): number {
    return this.transformation.fournisseurList.filter((f) => f.statutFourn === 'Externe').length;
  }

  initials(fournisseur: Fournisseur): string {
    return (fournisseur.raisonSociale || '')
      .split(' ')
      .filter((word) => word.length)
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  }

  toggleNewSupplierForm(): void {
    this.showNewSupplierForm = !this.showNewSupplierForm;
  }

  addSupplier(): void {
    if (!this.newSupplier.idFournisseur.trim() || !this.newSupplier.raisonSociale?.trim()) {
      return;
    }

    this.transformation.addFournisseur({
      ...this.newSupplier,
      idFournisseur: this.newSupplier.idFournisseur.trim()
    });

    this.newSupplier = {
      idFournisseur: '',
      raisonSociale: '',
      domaineActivite: '',
      disposeIFU_RCCM: false,
      numIFU_RCCM: '',
      emailTel: '',
      nomPrenomRepr: '',
      statutFourn: 'Externe'
    };
    this.showNewSupplierForm = false;
  }
}
