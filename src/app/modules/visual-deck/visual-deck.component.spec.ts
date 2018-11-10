import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualDeckComponent } from './visual-deck.component';

describe('VisualDeckComponent', () => {
  let component: VisualDeckComponent;
  let fixture: ComponentFixture<VisualDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualDeckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
