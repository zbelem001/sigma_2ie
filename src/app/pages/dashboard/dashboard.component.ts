import { Component } from '@angular/core';
import { TransformationService } from '../../services/transformation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent {
  constructor(public transformation: TransformationService) {}

  get marketsToLaunch(): number {
    return this.transformation.marcheList.filter((m) => m.statut === 'À lancer').length;
  }

  get marketsInAnalysis(): number {
    return this.transformation.marcheList.filter((m) => m.statut === 'Analyse').length;
  }

  get marketsInProgress(): number {
    return this.transformation.marcheList.filter((m) => m.statut === 'En cours').length;
  }

  get totalSuppliers(): number {
    return this.transformation.fournisseurList.length;
  }

  get sectorDistribution() {
    const distribution = [
      'Travaux BTP',
      'Fournitures IT',
      'Services Labo',
      'Consultance',
      'Autre'
    ] as const;
    const counts = distribution.map((category) => ({
      category,
      count: this.transformation.marcheList.filter((m) => (m.category ?? 'Autre') === category).length
    }));
    const total = counts.reduce((sum, item) => sum + item.count, 0) || 1;
    return counts.map((item) => ({
      ...item,
      percent: Math.round((item.count / total) * 100)
    }));
  }

  get recentActions() {
    return this.transformation.activityLog.slice(0, 5);
  }
}
