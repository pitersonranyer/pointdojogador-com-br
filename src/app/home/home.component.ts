import { UsuarioEntity } from './../../entities/usuario.entity';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { MenuService } from './../services/menu.service';
import { timer } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { OnInit, AfterViewInit, Component, OnDestroy, Renderer, ViewChild } from '@angular/core';
import { ConfirmationService, ScrollPanel } from 'primeng/primeng';
import { ImagemService } from '../services/imagem.service';
import { AuthService } from './../services/auth.service';
import { MensageriaService } from './../services/mensageria.service';
import { UtilService } from './../services/util.service';

@Component({
    selector: 'app-home',
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
        ]),
    ],
    styles: [`
    :host ::ng-deep button {
        margin-right: .25em;
     }`]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

    constructor(public renderer: Renderer,
        public utilService: UtilService,
        public mensageriaService: MensageriaService,
        private menuService: MenuService,
        public imagemService: ImagemService,
        private authService: AuthService,
        private confirmationService: ConfirmationService) { }

    public menuInactiveDesktop: boolean;

    public menuActiveMobile: boolean;

    public profileActive: boolean;

    public topMenuActive: boolean;

    public topMenuLeaving: boolean;

    @ViewChild('scroller') public scrollerViewChild: ScrollPanel;

    documentClickListener: Function;

    menuClick: boolean;

    topMenuButtonClick: boolean;

    versao;
    usuarioAutenticado: UsuarioEntity;
    titulo = '';

    ngOnInit() {
        this.versao = this.utilService.getVersaoSistema();
        this.usuarioAutenticado = this.utilService.getUsuarioAutenticado();
        this.titulo = this.utilService.getTituloAmbiente();
        document.body.className = '';
    }

    ngAfterViewInit() {
        setTimeout(() => { this.scrollerViewChild.moveBar(); }, 100);

        // hides the overlay menu and top menu if outside is clicked
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', (event) => {
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

    confirmarSaida() {
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja sair do sistema?',
            header: 'Confirmação',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.mensageriaService.limparMensagens();
                this.mensageriaService.processamento = true;
                this.authService.logout();
            }, reject: () => {
                return;
            }
        });
    }
}
