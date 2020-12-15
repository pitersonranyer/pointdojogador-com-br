import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adm-ligas',
  templateUrl: './adm-ligas.component.html',
  styleUrls: ['./adm-ligas.component.css']
})
export class AdmLigasComponent implements OnInit {
  private tagItems = ["Minimal", "Light", "New", "Friends"];

  private simpleSlider = 40;
  private doubleSlider = [20, 60];

  private state: boolean = true;
  private state1: boolean = true;
  private state2: boolean = true;

  private dropdownList = [];
  private selectedItems = [];
  private dropdownSettings = {};

  private dropdownList1 = [];
  private selectedItems1 = [];
  private dropdownSettings1 = {};

  

  // @Input() footerTemplate: TemplateRef<any>;

  constructor(private router: Router) {}

  ngOnInit() {
    this.dropdownList = [
      { id: 1, itemName: "Roman", category: "All" },
      { id: 2, itemName: "Paris", category: "All" },
      { id: 3, itemName: "Bucharest", category: "All" },
      { id: 4, itemName: "Rome", category: "All" },
      { id: 5, itemName: "New York", category: "All" },
      { id: 6, itemName: "Miami", category: "All" },
      { id: 7, itemName: "Piatra Neamt", category: "All" },
      { id: 8, itemName: "Paris", category: "All" },
      { id: 9, itemName: "Bucharest", category: "All" },
      { id: 10, itemName: "Rome", category: "All" },
      { id: 11, itemName: "New York", category: "All" },
      { id: 12, itemName: "Miami", category: "All" },
      { id: 13, itemName: "Piatra Neamt", category: "All" }
    ];
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      text: "Multiple Select",
      enableSearchFilter: true,
      classes: "",
      groupBy: "category"
    };

    this.dropdownList1 = [
      { id: 1, itemName: "Roman" },
      { id: 2, itemName: "Paris" },
      { id: 3, itemName: "Bucharest" },
      { id: 4, itemName: "Rome" },
      { id: 5, itemName: "New York" },
      { id: 6, itemName: "Miami" },
      { id: 7, itemName: "Piatra Neamt" },
      { id: 8, itemName: "Paris" },
      { id: 9, itemName: "Bucharest" },
      { id: 10, itemName: "Rome" },
      { id: 11, itemName: "New York" },
      { id: 12, itemName: "Miami" },
      { id: 13, itemName: "Piatra Neamt" }
    ];
    this.selectedItems1 = [];
    this.dropdownSettings1 = {
      singleSelection: true,
      text: "Single Select",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableSearchFilter: true,
      classes: "",
      lazyLoading: true
    };

    var slider = document.getElementById("sliderRegular");

    

    var slider2 = document.getElementById("sliderDouble");

    
  }
  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

  gerenciarLiga(){
    this.router.navigate(['/adm-ligas/gerenciarLiga']);
  }
  
 
}
