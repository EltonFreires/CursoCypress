context('Assertions', () => {
    beforeEach(() => { cy.visit('https://example.cypress.io/commands/assertions') });

    describe('Implicit Assertions', () => {
        it('.should() - make an assertion about the current subject', () => { // https://on.cypress.io/should
            cy.get('.assertion-table').find('tbody tr:last').should('have.class', 'success');
            // checking the text of the <td> element in various ways
            cy.get('.assertion-table').find('tbody tr:last').find('td').first().should('have.text', 'Column content');
            cy.get('.assertion-table').find('tbody tr:last').find('td').first().should('contain', 'Column content');
            cy.get('.assertion-table').find('tbody tr:last').find('td').first().should('have.html', 'Column content');

            cy.get('.assertion-table').find('tbody tr:last').find('td').first().should('match', 'td');
            // to match text content against a regular expression first need to invoke jQuery method text()
            // and then match using regular expression
            cy.get('.assertion-table').find('tbody tr:last').find('td').first().invoke('text').should('match', /column content/i);

            // a better way to check element's text content against a regular expression is to use "cy.contains"
            // finds first <td> element with text content matching regular expression
            cy.get('.assertion-table').find('tbody tr:last').contains('td', /column content/i).should('be.visible');
            // https://on.cypress.io/contains
            // https://on.cypress.io/using-cypress-faq#How-do-I-get-an-element’s-text-contents
        })

        it('.and() - chain multiple assertions together', () => { // https://on.cypress.io/and
            cy.get('.assertions-link').should('have.class', 'active').and('have.attr', 'href').and('include', 'cypress.io');
        })
    })

    describe('Explicit Assertions', () => { // https://on.cypress.io/assertions

        /* it('expect - make an assertion about a specified subject', () => {
            // We can use Chai's BDD style assertions
            expect(true).to.be.true
            const o = { foo: 'bar' }

            expect(o).to.equal(o)
            expect(o).to.deep.equal({ foo: 'bar' })
            // matching text using regular expression
            expect('FooBar').to.match(/bar$/i)
        }); */

        /* it('pass your own callback function to should()', () => {
            // Pass a function to should that can have any number of explicit assertions within it.
            // The ".should(cb)" function will be retried automatically until it passes all your explicit assertions or times out.
            cy.get('.assertions-p').find('p')
                .should(($p) => {  // https://on.cypress.io/$
                    // return an array of texts from all of the p's @ts-ignore TS6133 unused variable
                    const texts = $p.map((i, el) => Cypress.$(el).text());
                    // cy.log(texts);

                    // jquery map returns jquery object and .get() convert this to simple array
                    const paragraphs = texts.get();
                    // cy.log(paragraphs);
                   
                    // array should have length of 3
                    expect(paragraphs, 'has 3 paragraphs').to.have.length(3)

                    // use second argument to expect(...) to provide clear message with each assertion
                    expect(paragraphs, 'has expected text in each paragraph').to.deep.eq([
                        'Some text from first p', 'More text from second p', 'And even more text from third p',]);
                })
        }) */

        /* it('finds element by class name regex', () => {
            cy.get('.docs-header')
                .find('div')
                // .should(cb) callback function will be retried
                .should(($div) => {
                    expect($div).to.have.length(1)

                    const className = $div[0].className

                    expect(className).to.match(/heading-/)
                })
                // .then(cb) callback is not retried,
                // it either passes or fails
                .then(($div) => {
                    expect($div, 'text content').to.have.text('Introduction')
                })
        }) */

        /* it('can throw any error', () => {
            cy.get('.docs-header').find('div')
                .should(($div) => {
                    if ($div.length !== 1) {
                        cy.log('p1');
                        // you can throw your own errors
                        throw new Error('Did not find 1 element')
                    }

                    const className = $div[0].className

                    if (!className.match(/heading-/)) {
                        cy.log('p2');
                        throw new Error(`Could not find class "heading-" in ${className}`)
                    }
                })
        }) */

        it('matches unknown text between two elements', () => {
            let text;
            const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase();

            cy.get('.two-elements').find('.first').then(($first) => {
                text = normalizeText($first.text());
            });
            cy.get('.two-elements').find('.second').should(($div) => {
                const secondText = normalizeText($div.text());
                expect(secondText, 'second text').to.equal(text);
            });
        });

        it('assert - assert shape of an object', () => {
            const person = {
                name: 'Joe',
                age: 20,
            };
            assert.isObject(person, 'value is object');
        });

        it('retries the should callback until assertions pass', () => {
            cy.get('#random-number').should(($div) => {
                const n = parseFloat($div.text());
                expect(n).to.be.gte(1).and.be.lte(10)
            });
        });

        it('greater than, less than', () => {
            const my_value = 5000.00;
            
            cy.wrap(my_value).should('be.gt', 4999.99); // greater than
            cy.wrap(my_value).should('be.gte', 5000); // greater than equal to

            cy.wrap(my_value).should('be.lt', 5000.1);// less than
            cy.wrap(my_value).should('be.lte', 5000); // less than equal to
            
            cy.wrap(my_value).should('be.within', 5000, 6000);
        });
    });
});
