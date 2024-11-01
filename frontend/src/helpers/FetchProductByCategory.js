import SummaryApi from "../common";

const fetchProductByCategory = async(category) => {
   const response = await fetch(SummaryApi.productByCategory.url, {
      method: SummaryApi.productByCategory.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          category: category
      })
   })

   const dataResponse = await response.json();
   return dataResponse
}

export default fetchProductByCategory