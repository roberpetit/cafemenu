import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImgMenuComponent } from './img-menu.component';
import { RouterModule } from '@angular/router';

describe('ImgMenuComponent', () => {
  let component: ImgMenuComponent;
  let fixture: ComponentFixture<ImgMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgMenuComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ImgMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
