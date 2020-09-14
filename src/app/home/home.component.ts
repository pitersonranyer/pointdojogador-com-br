import { Component, AfterViewInit, OnDestroy, ViewChild, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ScrollPanel, ConfirmationService } from 'primeng/primeng';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Observable } from 'rxjs';

import { MessageService } from 'primeng/api';
import { MensageriaService } from '../services/mensageria.service';


@Component({
    selector: 'app-root',
    templateUrl: './home.component.html',
    animations: [
        trigger('submenu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ], providers: [MessageService]
})
export class HomeComponent implements AfterViewInit, OnDestroy {

    public menuInactiveDesktop: boolean;

    public menuActiveMobile: boolean;

    public profileActive: boolean;

    public topMenuActive: boolean;

    public topMenuLeaving: boolean;

    @ViewChild('scroller') public scrollerViewChild: ScrollPanel;

    documentClickListener: Function;

    menuClick: boolean;

    topMenuButtonClick: boolean;

    usuario$: Observable<Usuario>;
    usuario: Usuario;

    constructor(public renderer: Renderer2,
        private router: Router,
        private authService: AuthService,
        private confirmationService: ConfirmationService,
        public usuarioService: UsuarioService,
        public mensageriaService: MensageriaService) {

        document.body.className = '';
        this.usuario$ = usuarioService.getUsuario();
        this.usuario$.subscribe(usuario => this.usuario = usuario);
        this.router.navigate(['/dashboard']);
    }

    ngAfterViewInit() {
        setTimeout(() => { this.scrollerViewChild.moveBar(); }, 100);

        // hides the overlay menu and top menu if outside is clicked
        this.documentClickListener = this.renderer.listen('body', 'click', (event) => {
            if (!this.isDesktop()) {
                if (!this.menuClick) {
                    this.menuActiveMobile = false;
                }

                if (!this.topMenuButtonClick) {
                    this.hideTopMenu();
                }
            }

            this.menuClick = false;
            this.topMenuButtonClick = false;
        });
    }

    toggleMenu(event: Event) {
        this.menuClick = true;
        if (this.isDesktop()) {
            this.menuInactiveDesktop = !this.menuInactiveDesktop;
            if (this.menuInactiveDesktop) {
                this.menuActiveMobile = false;
            }
        } else {
            this.menuActiveMobile = !this.menuActiveMobile;
            if (this.menuActiveMobile) {
                this.menuInactiveDesktop = false;
            }
        }

        if (this.topMenuActive) {
            this.hideTopMenu();
        }

        event.preventDefault();
    }

    toggleProfile(event: Event) {
        this.profileActive = !this.profileActive;
        event.preventDefault();
    }

    toggleTopMenu(event: Event) {
        this.topMenuButtonClick = true;
        this.menuActiveMobile = false;

        if (this.topMenuActive) {
            this.hideTopMenu();
        } else {
            this.topMenuActive = true;
        }

        event.preventDefault();
    }

    hideTopMenu() {
        this.topMenuLeaving = true;
        setTimeout(() => {
            this.topMenuActive = false;
            this.topMenuLeaving = false;
        }, 500);
    }

    onMenuClick() {
        this.menuClick = true;

        setTimeout(() => { this.scrollerViewChild.moveBar(); }, 500);
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    onSearchClick() {
        this.topMenuButtonClick = true;
    }

    ngOnDestroy() {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
    }

    deslogar() {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja sair?',
            header: 'Confirmação',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.mensageriaService.limparMensagens();
                this.authService.deslogar().subscribe(() => {
                });
            }, reject: () => {
                return;
            }

        });

    }
}
