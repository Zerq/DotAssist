const add = (parent, child) => {
    parent.appendChild(child?.nodeType ? child : document.createTextNode(child));
};

const appendChild = (parent, child) => {
    if (Array.isArray(child)) {
        child.forEach((nestedChild) => appendChild(parent, nestedChild));
    } else {
        add(parent, child);
    }
};

export const jsx = (tag, props) => {
    const { children, ...rest } = props;
    if (typeof tag === 'function') return tag(props, children);
    const element = document.createElement(tag);

    for (const p in rest) {
        if (p.startsWith('on') && p.toLowerCase() in window) {
            element.addEventListener(p.toLowerCase().substring(2), props[p]);
        }
    }

    appendChild(element, children);
    return element;
};

export const jsxs = jsx;