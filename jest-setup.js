import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value.toString();
    }

    removeItem(key) {
        delete this.store[key];
    }
}

global.localStorage = new LocalStorageMock();

class SessionStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value.toString();
    }

    removeItem(key) {
        delete this.store[key];
    }
}

global.sessionStorage = new SessionStorageMock();

const matchMedia = () => ({
    matches: false,
    addListener() {},
    removeListener() {}
});

window.matchMedia = window.matchMedia || matchMedia;

class CookieMock {
    constructor() {
        this.value = '';
    }

    get cookie() {
        return this.value;
    }

    set cookie(value) {
        this.value += `${this.value};`;
    }
}

document.cookie = new CookieMock();
