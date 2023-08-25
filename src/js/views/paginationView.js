import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {

    this._parentElement.addEventListener('click', function (e) {

      const btn = e.target.closest('.btn--inline');

      // console.log(btn);

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      // console.log(goToPage);

      handler(goToPage);

    });

  }
  _generateMarkupButton(curPage, type){
    if(type=='right'){
      return `<button data-goto="${
        curPage + 1
      }"class="btn--inline pagination__btn--next">
      <span>Page ${curPage+1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    else{
      return `<button data-goto="${

        curPage - 1

      }"class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>`;
    }
  }
  _generateMarkup() {
    const curPage = this._data.page;
    // console.log(curPage)
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);

    //page1,and there are more
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(curPage, 'right');
    }

    //last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton(curPage, 'left');
    }

    //other pages
    if (curPage < numPages) {
      return `
      ${this._generateMarkupButton(curPage, 'left')}
      ${this._generateMarkupButton(curPage, 'right')}
      `
    }

    //page 1 and there are no more pages
    return 'There is only one page';
  }
}

export default new PaginationView();