import { Component, signal } from '@angular/core';
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
    selector: 'app-root',
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
        MatButtonModule,
        MatDividerModule,
    ],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
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
                label: 'Consultas',
                icon: 'search',
                children: [
                    { label: 'Por Nome', icon: 'badge', route: '/consultas/nome' },
                    { label: 'Por CPF', icon: 'credit_card', route: '/consultas/cpf' },
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
