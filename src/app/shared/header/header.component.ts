import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() breadcrumb: string[] = ['Tableau de bord'];
  @Input() searchPlaceholder = 'Rechercher...';
  @Input() userName = 'Agent des marchés';
  @Input() userDepartment = 'Direction Achats';
  @Input() userAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKktJmDmDz6PgQZWFSHCe0GNn3jEq-R_J9m_wRCOO2rpewMZ-5iRgJAN0eTtN63ygVw1OMDdh4lZfaTTI2S-9EoUKP2CzEaGiD4WMCAenoQEr_Fno-dae98PpY_zQmwqocw3WC33ebmpK-2iOoDcJ_c7geNMq-NkMBVaEbFgbohwpOPu9Vt-5QrWWvb6HThFl4le9fALC9jUArErWviqz2_8m5Ioz6_Qtt48j7SAeZ_vYUzcsDUlkAblTJhWAxRygSi9j_1emfpsg';
}
