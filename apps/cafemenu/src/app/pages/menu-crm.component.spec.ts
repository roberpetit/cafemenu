import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuCrmComponent } from './menu-crm.component';

describe('MenuCrmComponent', () => {
  let component: MenuCrmComponent;
  let fixture: ComponentFixture<MenuCrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCrmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuCrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
