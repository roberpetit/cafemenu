import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminAddEditComponent } from './admin-add-edit.component';

describe('AdminAddEditComponent', () => {
  let component: AdminAddEditComponent;
  let fixture: ComponentFixture<AdminAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
