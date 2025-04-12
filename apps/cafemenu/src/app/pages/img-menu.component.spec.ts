import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImgMenuComponent } from './img-menu.component';

describe('ImgMenuComponent', () => {
  let component: ImgMenuComponent;
  let fixture: ComponentFixture<ImgMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImgMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
