import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonolibComponent } from './monolib.component';

describe('MonolibComponent', () => {
  let component: MonolibComponent;
  let fixture: ComponentFixture<MonolibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonolibComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MonolibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
