import { PartyShopperPage } from './app.po';

describe('party-shopper App', function() {
  let page: PartyShopperPage;

  beforeEach(() => {
    page = new PartyShopperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
