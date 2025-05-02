import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { FileService, MenuListComponent } from "@cafemenu-monorepo/monolib";
import { MenuCategory } from "@cafemenu-monorepo/monolib";
import { MenuItemConfirmationDialogComponent } from "libs/monolib/src/lib/monolib/components/menu-item-confirmation-dialog/menu-item-confirmation-dialog.component";

@Component({
    selector: 'app-menu',
    imports: [CommonModule, MatButtonModule, MatListModule, MatIconModule, FormsModule, MatCardModule, MenuListComponent],
    providers: [FileService],
    standalone: true,
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
  })
export class MenuComponent implements OnInit {
    
    menu: MenuCategory[] = [];
    canEdit = true; 

    constructor(private readonly fileService: FileService, private dialog: MatDialog) { }

    ngOnInit(): void {
        this.fileService.getFile('menu-data.json').subscribe((data: MenuCategory[]) => {
            this.menu = data;
            console.log(this.menu);
        });
    }
    
    openAddCategoryDialog(): void {
        const dialogRef = this.dialog.open(MenuItemConfirmationDialogComponent, {
            width: '400px',
            data: { title: '', items: [] }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.menu.push(result);
                this.fileService.saveFile('menu-data.json', this.menu).subscribe(() => {
                    console.log('Menu updated successfully!');
                });
            }
        });
    }

    deleteCategory(index: number): void {
        this.menu.splice(index, 1);
    }

    editCategory(index: number, category: MenuCategory): void {
        this.menu[index] = category;
    }

}