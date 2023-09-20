const fs = require('fs');
const archivoJson = 'productos.json';

if (!fs.existsSync(archivoJson)) {
    const data = JSON.stringify({}, null, 2);

    fs.writeFileSync(archivoJson, data);
};

class ProductManager {

    

constructor(){
    this.products = [];
    this.productIdCounter = 1;
    this.path = 'productos.json';
}
addProduct(title, description, price, thumbnail, code, stock){

    const isCodeUnique = !this.products.some(product => product.code === code);

    if (!isCodeUnique) {
    console.error(`El código '${code}' ya existe en otro producto. No se puede agregar.`);
    }

const product = {
    id: this.productIdCounter ++,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
};
this.products.push(product);
return product;

}
getProducts() {
    return this.products;
}

getProductById(id) {
    const product = this.products.find(product => product.id === id);

    if (!product) {
    console.error(`No se encontró ningún producto con el ID '${id}'.`);
    }
    return product;
}

updateProduct(id, updatedProductInfo) {
    const productIndex = this.products.findIndex(product => product.id === id);

    if (productIndex === -1) {
        console.error(`No se encontró ningún producto con el ID '${id}'. No se puede actualizar.`);
    }

    const existingProduct = this.products[productIndex];

    if (updatedProductInfo.title) {
        existingProduct.title = updatedProductInfo.title;
    }
    if (updatedProductInfo.description) {
        existingProduct.description = updatedProductInfo.description;
    }
    if (updatedProductInfo.price) {
        existingProduct.price = updatedProductInfo.price;
    }
    if (updatedProductInfo.thumbnail) {
        existingProduct.thumbnail = updatedProductInfo.thumbnail;
    }
    if (updatedProductInfo.code) {
        const isCodeUnique = !this.products.some(product => product.code === updatedProductInfo.code);

        if (!isCodeUnique) {
            console.error(`El código '${updatedProductInfo.code}' ya existe en otro producto. No se puede actualizar.`);
        }

        existingProduct.code = updatedProductInfo.code;
    }
    if (updatedProductInfo.stock) {
        existingProduct.stock = updatedProductInfo.stock;
    }

    return existingProduct;
}
deleteProduct(id) {
    const productIndex = this.products.findIndex(product => product.id === id);

    if (productIndex === -1) {
        console.error(`No se encontró ningún producto con el ID '${id}'. No se puede eliminar.`);
        return null;
    }

    const deletedProduct = this.products.splice(productIndex, 1)[0];
    return deletedProduct;
}

saveProducts() {
    const fs = require('fs');

    try {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data);
        console.log(`Productos guardados en ${this.path}`);
    } catch (error) {
        console.error('Error al guardar los productos:', error);
    }
}

loadProducts() {
    const fs = require('fs');

    try {
        const data = fs.readFileSync(this.path, 'utf-8');
        this.products = JSON.parse(data) || [];
        console.log(`Productos cargados desde ${this.path}`);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}
}



//PRUEBA:

const productManager = new ProductManager('productos.json');
productManager.addProduct("Pan", "Comestible", 350, "1.jpg", "codigo1", 3);
productManager.addProduct("Pollo", "Carnes", 2500, "2.jpg", "codigo2", 1);

console.log(productManager.getProducts());
console.log(productManager.getProductById(2));

const updatedProductInfo = {
    title: "Pollo a la Parrilla", 
};

const updatedProduct = productManager.updateProduct(2, updatedProductInfo);

console.log(productManager.getProducts());

const deletedProduct = productManager.deleteProduct(1);

console.log(productManager.getProducts());

productManager.saveProducts();
