import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCreatePost } from './page-create-post.component';

describe('CreatePostComponent', () => {
  let component: PageCreatePost;
  let fixture: ComponentFixture<PageCreatePost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageCreatePost ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCreatePost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
