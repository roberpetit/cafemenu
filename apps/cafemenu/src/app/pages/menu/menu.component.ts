import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { FileService, MenuCategoryComponent } from "@cafemenu-monorepo/monolib";
import { MenuCategory } from "@cafemenu-monorepo/monolib";

@Component({
    selector: 'app-menu',
    imports: [CommonModule, MatButtonModule, MatListModule, MatIconModule, FormsModule, MenuCategoryComponent, MatCardModule],
    providers: [FileService],
    standalone: true,
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
  })
export class MenuComponent implements OnInit {
    
    menu: MenuCategory[] = [];
    canEdit = true; 

    constructor(private readonly fileService: FileService) { }

    ngOnInit(): void {
        this.fileService.getFile('menu-data.json').subscribe((data: MenuCategory[]) => {
            this.menu = data;
            console.log(this.menu);
        });
    }

    
    addItem(index: number) {
      this.menu[index].items.push({ title: "Nuevo ítem", description: "" });
    }
    
    removeItem(catIndex: number, itemIndex: number) {
      this.menu[catIndex].items.splice(itemIndex, 1);
    }

    addCategory(): void {
        this.menu.push({ title: "Nueva categoría", items: [] });
    }
    
    deleteCategory(index: number): void {
        this.menu.splice(index, 1);
    }
}