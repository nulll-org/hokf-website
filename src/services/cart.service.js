const setCart = (cart) => { localStorage.setItem('cart', JSON.stringify(cart)) }

const getCart = () => { return JSON.parse(localStorage.getItem('cart')) || [] }

export { setCart, getCart }