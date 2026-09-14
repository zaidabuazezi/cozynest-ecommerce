export async function getProductsData() {
    let response=await fetch("./products.json");

   if(!response.ok) {
    throw new Error("Failed to load products");
   }

    let data=await response.json();
    return data;
}



