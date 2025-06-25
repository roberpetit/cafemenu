import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarIconsComponent } from './toolbar-icons.component';

describe('ToolbarIconsComponent', () => {
  let component: ToolbarIconsComponent;
  let fixture: ComponentFixture<ToolbarIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarIconsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
