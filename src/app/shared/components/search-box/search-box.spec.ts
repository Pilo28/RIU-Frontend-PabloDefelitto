import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBox } from './search-box';
import { By } from '@angular/platform-browser';

describe('SearchBox', () => {
  let fixture: ComponentFixture<SearchBox>;
  let component: SearchBox;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBox]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBox);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render input with default placeholder and value', () => {
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.placeholder).toBe('Buscar...');
    expect(input.value).toBe('');
  });


  it('should emit search event on input', () => {
    spyOn(component.search, 'emit');
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'Spiderman';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.search.emit).toHaveBeenCalledWith('Spiderman');
  });
});
