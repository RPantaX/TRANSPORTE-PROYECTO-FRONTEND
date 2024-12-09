import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: `.menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .menu-label {
    font-size: 0.9rem;
    color: white;
    text-align: center;
  }`
})
export class HomeComponent {
  menuItems = [
    { label: 'Home', icon: 'pi pi-home', route: '/home' },
    { label: 'Entidad', icon: 'pi pi-book', route: '/entidad' },
    { label: 'Documento', icon: 'pi pi-id-card', route: '/document-type' },
    { label: 'Contribuidor', icon: 'pi pi-address-book', route: '/contributor-type' },
    { label: 'Usuarios', icon: 'pi pi-users', route: '/users' },
    { label: 'Perfil', icon: 'pi pi-user', route: '/profile' }
  ];
}
