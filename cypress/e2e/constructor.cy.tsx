describe('Проверка работоспособности приложения', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');

    cy.setCookie('accessToken', 'mockAccessToken');
    localStorage.setItem('refreshToken', 'mockRefreshToken');

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.setCookie('accessToken', '');
    localStorage.setItem('refreshToken', '');
  });

  describe('Добавление ингредиента из списка ингредиентов в конструктор', () => {
    it('Добавление булки', () => {
      cy.get('div').contains('Выберите булки').should('exist');

      const addBun = cy.get('h3').contains('Булки').next('ul').contains('Добавить');

      addBun.click();

      cy.get('div').contains('Выберите булки').should('not.exist');
    });

    it('Добавление начинки', () => {
      cy.get('div').contains('Выберите начинку').should('exist');

      const addMain = cy.get('h3').contains('Начинки').next('ul').contains('Добавить');

      addMain.click();

      cy.get('div').contains('Выберите начинку').should('not.exist');
    });

    it('Добавление соусов', () => {
      cy.get('div').contains('Выберите начинку').should('exist');

      const addSauce = cy.get('h3').contains('Соусы').next('ul').contains('Добавить');

      addSauce.click();

      cy.get('div').contains('Выберите начинку').should('not.exist');
    });
  });

  describe('Работа модальных окон', () => {
    beforeEach(() => {
      cy.get('[data-cy=ingredients-category]').find('li').first().as('ingredient');
    });

    it('Открытие модального окна ингредиента', () => {
      cy.get('[data-cy=modal]').should('not.exist');
      cy.get('@ingredient').click();
      cy.get('[data-cy=modal]').should('be.visible');
      cy.contains('Детали ингредиента').should('exist');
    });

    it('Закрытие по клику на крестик', () => {
      cy.get('@ingredient').click();
      cy.get('[data-cy=modal]').should('be.visible');
      cy.get('[data-cy=close-button]').click();
      cy.get('[data-cy=modal]').should('not.exist');
    });

    it('Закрытие по клику на оверлей', () => {
      cy.get('@ingredient').click();
      cy.get('[data-cy=modal]').should('be.visible');
      cy.get('[data-cy=overlay]').click({ force: true });
      cy.get('[data-cy=modal]').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.intercept('POST', 'api/orders', {fixture: 'order.json',}).as('postOrders');
    });
  
    it('Добавление ингредиентов в конструктор бургера', () => {
      const addBun = cy.get('h3').contains('Булки').next('ul').contains('Добавить');
      const addMain = cy.get('h3').contains('Начинки').next('ul').contains('Добавить');
      const addSauce = cy.get('h3').contains('Соусы').next('ul').contains('Добавить');
  
      addBun.click();
      addMain.click();
      addSauce.click();
    });
  
    it('Проверка отображения модального окна с верным номером заказа', () => {
      cy.get('[data-cy=modal]').should('not.exist');
  
      const addBun = cy.get('h3').contains('Булки').next('ul').contains('Добавить');
      const addMain = cy.get('h3').contains('Начинки').next('ul').contains('Добавить');
      const addSauce = cy.get('h3').contains('Соусы').next('ul').contains('Добавить');
  
      addBun.click();
      addMain.click();
      addSauce.click();
  
      cy.contains('Оформить заказ').click();
  
      cy.get('[data-cy=modal]').should('be.visible');
      cy.contains('1111').should('exist');
    });
  
    it('Проверка закрытия модалки и очистки конструктора бургера от добавленных ингредиентов', () => {
      const addBun = cy.get('h3').contains('Булки').next('ul').contains('Добавить');
      const addMain = cy.get('h3').contains('Начинки').next('ul').contains('Добавить');
      const addSauce = cy.get('h3').contains('Соусы').next('ul').contains('Добавить');
  
      addBun.click();
      addMain.click();
      addSauce.click();
  
      cy.contains('Оформить заказ').click();
  
      cy.get('[data-cy=modal]').should('be.visible');
      cy.get('[data-cy=close-button]').click();
      cy.get('[data-cy=modal]').should('not.exist');
      cy.contains('1111').should('not.exist');
  
      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    });
  });
  
});
