import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
interface MenuItem {
    label: string;
    icon: string;
    route?: string;
    children?: MenuItem[];
}
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    FormsModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss'],
})

export class MainLayout {
    menuItems: MenuItem[] = [];

    ngOnInit(): void {
        // Menu carregado dinamicamente
        this.menuItems = [
            {
                label: 'Cadastros',
                icon: 'person',
                children: [
                    { label: 'Novo Cliente', icon: 'person_add', route: '/cadastro' },
                    { label: 'Lista de Clientes', icon: 'list', route: '/consulta' },
                ],
            },
            {
                label: 'Sprints',
                icon: 'search',
                children: [
                    {
                        label: 'Total de Pontos',
                        icon: 'badge',
                        route: '/lista-pontos',
                    },
                ],
            },
            {
                label: 'Relatórios',
                icon: 'bar_chart',
                children: [
                    { label: 'Mensal', icon: 'calendar_month', route: '/relatorios/mensal' },
                    { label: 'Anual', icon: 'event', route: '/relatorios/anual' },
                ],
            },
        ];
    }
}
