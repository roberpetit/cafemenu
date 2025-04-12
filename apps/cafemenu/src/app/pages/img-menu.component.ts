import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-img-menu',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './img-menu.component.html',
  styleUrl: './img-menu.component.scss',
})
export class ImgMenuComponent implements OnInit {
  @Input() navigateTo = '';
  
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    console.log("navigateTo", this.navigateTo);
    this.activatedRoute.params.subscribe((params) => {
      console.log("params", params);
      if (params['pagina']) {
        this.navigateTo = params['pagina'];
        this.scrollTo(this.navigateTo);
      }
    }
    );
    console.log("navigateTo", this.navigateTo);
  }

  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error(`Element with id ${id} not found`);
    }
  }

}
