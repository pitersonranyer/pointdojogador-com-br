import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert2';

var misc: any = {
  sidebar_mini_active: true
}

export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  isCollapsed?: boolean;
  isCollapsing?: any;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'design_app'
  },

  {
    path: '/cartola/consultarBilhete',
    title: 'Bilhete',
    type: 'link',
    icontype: 'design_image',
  },

//  {
//    path: '/cartola',
//    title: 'Cartola',
//    type: 'sub',
//    icontype: 'design_image',
//    collapse: 'cartola',
//    isCollapsed: true,
//    children: [
//            { path: 'consultarBilhete', title: 'Consultar Bilhete', ab: 'CB' }
//      { path: 'meusTimes', title: 'Meus Times', ab: 'MT' },
//      { path: 'minhasLigas', title: 'Minhas Ligas', ab: 'ML' },
//   ]
//  },

  {
    path: '/pages/login',
    title: 'Login',
    type: 'link1',
    icontype: 'media-1_button-power'
  },
  {
    path: '/pages/register',
    title: 'Registrar',
    type: 'link1',
    icontype: 'tech_laptop'
  }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;

  usuario$: Observable<Usuario>;
  usuario: Usuario;
  nomeAbr: string;

  constructor(private toastr: ToastrService,
    private authService: AuthService,
    public usuarioService: UsuarioService,
    @Inject(DOCUMENT) private _document: Document) {
    this.usuario$ = usuarioService.getUsuario();
    this.usuario$.subscribe(usuario => this.usuario = usuario);
  }

  ngOnInit() {

    this.nomeAbr = '';
    if (this.usuario.nome) {
      this.nomeAbr = this.usuario.nome.substring(0, 15);
    }

    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if (new Date().getTime() - start > milliseconds) {
        break;
      }
    }
  }
  myFunc(event, menuitem) {
    event.preventDefault();
    event.stopPropagation();
    this.sleep(10);
    if (menuitem.isCollapsing === undefined) {
      menuitem.isCollapsing = true;

      // menuitem.isCollapsed = !menuitem.isCollapsed;

      var element = event.target;
      while (
        element.getAttribute('data-toggle') != 'collapse' &&
        element != document.getElementsByTagName('html')[0]
      ) {
        element = element.parentNode;
      }
      element = element.parentNode.children[1];

      if (
        element.classList.contains('collapse') &&
        !element.classList.contains('show')
      ) {
        element.classList = 'before-collapsing';
        var style = element.scrollHeight;

        element.classList = 'collapsing';
        setTimeout(function () {
          element.setAttribute('style', 'height:' + style + 'px');
        }, 1);
        setTimeout(function () {
          element.classList = 'collapse show';
          element.removeAttribute('style');
          menuitem.isCollapsing = undefined;
        }, 350);
      } else {
        var style = element.scrollHeight;
        setTimeout(function () {
          element.setAttribute('style', 'height:' + (style + 20) + 'px');
        }, 3);
        setTimeout(function () {
          element.classList = 'collapsing';
        }, 3);
        setTimeout(function () {
          element.removeAttribute('style');
        }, 20);
        setTimeout(function () {
          element.classList = 'collapse';
          menuitem.isCollapsing = undefined;
        }, 400);
      }
    }
  }
  minimizeSidebar() {
    const body = document.getElementsByTagName('body')[0];
    if (body.classList.contains('sidebar-mini')) {
      misc.sidebar_mini_active = true
    } else {
      misc.sidebar_mini_active = false;
    }
    if (misc.sidebar_mini_active === true) {
      body.classList.remove('sidebar-mini');
      misc.sidebar_mini_active = false;
      this.showSidebarMessage('Sidebar mini deactivated...');
    } else {
      body.classList.add('sidebar-mini');
      this.showSidebarMessage('Sidebar mini activated...');
      misc.sidebar_mini_active = true;
    }

    // we simulate the window Resize so the charts will get updated in realtime.
    const simulateWindowResize = setInterval(function () {
      window.dispatchEvent(new Event('resize'));
    }, 180);

    // we stop the simulation of Window Resize after the animations are completed
    setTimeout(function () {
      clearInterval(simulateWindowResize);
    }, 1000);
  }

  showSidebarMessage(message) {
    this.toastr.show(
      '<span class="now-ui-icons ui-1_bell-53"></span>', message,
      {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-danger alert-with-icon',
        positionClass: 'toast-top-right'
      }
    );
  }
  deslogar() {

    swal({
      title: 'Tem certeza que deseja sair?',
      text: 'Confirmação',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      cancelButtonText: 'Não!',
      confirmButtonText: 'Sim!',
      buttonsStyling: false
    }).then(result => {
      if (result.value) {
        this.authService.deslogar().subscribe(() => {
          this._document.defaultView.location.reload();
        });
      } else {
        swal({
          title: 'Cancelado',
          text: 'Operação cancelada',
          type: 'error',
          confirmButtonClass: 'btn btn-info',
          buttonsStyling: false
        }).catch(swal.noop);
      }
    });
  }
}
