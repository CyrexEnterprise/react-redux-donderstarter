// eslint-disable-next-line import/named
import { fetch, save, remove, __RewireAPI__ as baseActionsRewire } from './baseActions.js';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

describe('actions.baseActions', function() {

  before(() => baseActionsRewire.__Rewire__('axios', {
    get: url => Promise.resolve(url),
    post: url => Promise.resolve(url)
  }));

  after(() => baseActionsRewire.__ResetDependency__('axios'));

  it('should fetch for given endpoint', function() {
    const fetched = fetch('TEST');

    expect(fetched).to.have.property('type', 'TEST');
    expect(fetched).to.have.property('payload');
    return expect(fetched.payload).to.eventually.equal(
      'http://rest.learncode.academy/api/wstern/test'
    );
  });

  it('should save for given endpoint', function() {
    const fetched = save('TEST');

    expect(fetched).to.have.property('type', 'TEST');
    expect(fetched).to.have.property('payload');
    return expect(fetched.payload).to.eventually.equal(
      'http://rest.learncode.academy/api/wstern/test'
    );
  });

  it('should remove for given endpoint', function() {
    const fetched = remove('TEST');

    expect(fetched).to.have.property('type', 'TEST');
    expect(fetched).to.have.property('payload');
    return expect(fetched.payload).to.eventually.equal(
      'http://rest.learncode.academy/api/wstern/test'
    );
  });

});
