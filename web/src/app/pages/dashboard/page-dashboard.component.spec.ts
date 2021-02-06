import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDashboard } from './page-dashboard.component';

describe('DashboardComponent', () => {
  let component: PageDashboard;
  let fixture: ComponentFixture<PageDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDashboard ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
