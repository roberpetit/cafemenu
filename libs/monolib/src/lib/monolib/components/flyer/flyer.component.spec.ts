import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlyerComponent } from './flyer.component';

describe('FlyerComponent', () => {
  let component: FlyerComponent;
  let fixture: ComponentFixture<FlyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlyerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
