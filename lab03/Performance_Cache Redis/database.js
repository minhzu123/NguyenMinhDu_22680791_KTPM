function getProductFromDB(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          name: "Macbook Pro M3",
          price: 50000000
        });
      }, 3000); 
    });
  }
  
  module.exports = getProductFromDB;
  