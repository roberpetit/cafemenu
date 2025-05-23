import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import {
  AuthService,
  BatchWrite,
  CategoryService,
  MenuCategoryEditDialogComponent,
  MenuListComponent,
} from '@cafemenu-monorepo/monolib';
import { MenuCategory } from '@cafemenu-monorepo/monolib';
import { Observable } from 'rxjs';
import * as admin from 'firebase-admin';

@Component({
  selector: 'app-menu',
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    MenuListComponent,
  ],
  providers: [],
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit, OnDestroy {
  menuCategories: MenuCategory[] = [];
  canEdit = false;
  subscription: any;
  navigateTo = '';
  collapsableView: WritableSignal<boolean>;
  queue: Observable<BatchWrite[]>;

  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.collapsableView = this.categoryService.collapsableView;
    this.queue = this.categoryService.queue$;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['pagina']) {
        this.navigateTo = params['pagina'];
        this.scrollTo(this.navigateTo);
      }
    });

    this.subscription = this.authService.isAdmin$.subscribe((admin) => {
      if (admin) {
        this.canEdit = true;
      } else {
        this.canEdit = false;
      }
    });

    this.categoryService.categories$.subscribe((categories) => {
      this.menuCategories = categories;
    });
  }

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(MenuCategoryEditDialogComponent, {
      width: '800px',
      data: { category: { title: '', opcionales: [] }, isAddMode: true },
    });

    dialogRef.afterClosed().subscribe((result: MenuCategory) => {
      if (result) {
        this.menuCategories.push(result)
        this.categoryService.addCategory({
          title: result.title,
          items: result.items || [],
          opcionales: result.opcionales || [],
        });
      }
    });
  }

  deleteCategory(index: number): void {
    this.categoryService.deleteCategory(this.menuCategories[index].id || '');
    this.menuCategories.splice(index, 1);
  }

  editCategory(category: MenuCategory): void {
    this.categoryService.editCategory(category.id || '', category);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // this.categoryService.categories$.unsubscribe();
  }

  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    } else {
      console.error(`Element with id ${id} not found`);
    }
  }

  save(): void {
    this.categoryService.scheduleFlush()
  }
}
