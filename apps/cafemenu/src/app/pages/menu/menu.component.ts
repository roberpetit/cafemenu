import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ActivatedRoute } from "@angular/router";
import { AuthService, CategoryService, MenuCategoryEditDialogComponent, MenuListComponent } from "@cafemenu-monorepo/monolib";
import { MenuCategory } from "@cafemenu-monorepo/monolib";

@Component({
    selector: 'app-menu',
    imports: [CommonModule, MatTooltipModule, MatButtonModule, MatListModule, MatIconModule, FormsModule, MatCardModule, MenuListComponent],
    providers: [],
    standalone: true,
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
  })
export class MenuComponent implements OnInit, OnDestroy {
    
    menu: MenuCategory[] = [];
    canEdit = false; 
    subscription: any;
    navigateTo = '';

    constructor(private dialog: MatDialog, private categoryService: CategoryService, private authService: AuthService,
        private activatedRoute: ActivatedRoute
    ) { 
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            if (params['pagina']) {
              this.navigateTo = params['pagina'];
              this.scrollTo(this.navigateTo);
            }
          });

        this.subscription = this.authService.user$.subscribe((user) => {
            if (user) {
                this.canEdit = true;
            } else {
                this.canEdit = false;
            }
        });
        //this.fileService.getFile('menu-data.json').subscribe((data: MenuCategory[]) => {
            //this.menu = data;
          //  console.log(this.menu);
        //});

        this.categoryService.categories$.subscribe((categories) => {
            this.menu = categories;
        });
    }
    
    openAddCategoryDialog(): void {
        const dialogRef = this.dialog.open(MenuCategoryEditDialogComponent, {
            width: '500px',
            data: { category: {title: '', opcionales: []}, isAddMode: true }
        });

        dialogRef.afterClosed().subscribe((result: MenuCategory) => {
            if (result) {
                //this.menu.push({ title: result, items: [], opcionales: [] });
                this.categoryService.addCategory({ title: result.title, items: result.items || [], opcionales: result.opcionales || []})
                    .then((response) => {
                    console.log('Category added successfully!', response);
                }
                , (error) => {
                    console.error('Error adding category:', error);
                });
            }
        });
    }

    deleteCategory(index: number): void {
        this.categoryService.deleteCategory(this.menu[index].id || '').then((response) => {
            console.log('Category deleted successfully!', response);
        }
        , (error) => {
            console.error('Error deleting category:', error);
        }
        );
    }

    editCategory(category: MenuCategory): void {
        console.log('Editing category:', category);
        this.categoryService.editCategory(category.id || '', category).then((response) => {
            console.log('Category updated successfully!', response);
        }, (error) => {
            console.error('Error adding category:', error);
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from any subscriptions if necessary
        this.subscription.unsubscribe();
        // this.categoryService.categories$.unsubscribe();        
    }

    scrollTo(id: string) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: "center", inline: "center" });
        } else {
          console.error(`Element with id ${id} not found`);
        }
      }
}