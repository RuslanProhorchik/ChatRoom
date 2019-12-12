import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayConversationComponent } from './display-conversation.component';

describe('DisplayConversationComponent', () => {
  let component: DisplayConversationComponent;
  let fixture: ComponentFixture<DisplayConversationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayConversationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
