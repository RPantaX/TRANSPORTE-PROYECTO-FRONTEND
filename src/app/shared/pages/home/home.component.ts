import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

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
export class HomeComponent implements OnInit{
  public username: string = '';
  menuItems = [
    { label: 'Home', icon: 'pi pi-home', route: '/home' },
    { label: 'Entidad', icon: 'pi pi-book', route: '/entidad' },
    { label: 'Documento', icon: 'pi pi-id-card', route: '/document-type' },
    { label: 'Contribuidor', icon: 'pi pi-address-book', route: '/contributor-type' },
    { label: 'Camion', icon: 'pi pi-truck', route: '/camion' },
    { label: 'Camionero', icon: 'pi pi-user', route: '/camionero' },
    //{ label: 'Usuarios', icon: 'pi pi-users', route: '/users' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authService.username$.subscribe(username => {
      console.log('username'+username);
      this.username = username;
    });
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }
}
