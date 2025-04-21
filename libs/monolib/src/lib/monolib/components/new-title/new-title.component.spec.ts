import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTitleComponent } from './new-title.component';

describe('NewItemComponent', () => {
  let component: NewTitleComponent;
  let fixture: ComponentFixture<NewTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
