import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEditPost } from './edit-post.component';

describe('PageEditPost', () => {
  let component: PageEditPost;
  let fixture: ComponentFixture<PageEditPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEditPost ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEditPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
