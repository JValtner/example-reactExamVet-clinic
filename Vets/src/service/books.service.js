import AxiosConfig from "../config/axios.config";

const BOOKS_RESOURCE = "api/books";

// GET all books
export async function getAllBooks() {
  const response = await AxiosConfig.get(BOOKS_RESOURCE);
  return response.data;
}

// GET a book by id
export async function getBookById(id) {
  const response = await AxiosConfig.get(`${BOOKS_RESOURCE}/${id}`);
  return response.data;
}

// CREATE a new book
export async function createBook(bookData) {
  const response = await AxiosConfig.post(BOOKS_RESOURCE, bookData);
  return response.data;
}

// UPDATE a book
export async function updateBook(id, bookData) {
  const response = await AxiosConfig.put(`${BOOKS_RESOURCE}/${id}`, bookData);
  return response.data;
}

// DELETE a book
export async function deleteBook(id) {
  const response = await AxiosConfig.delete(`${BOOKS_RESOURCE}/${id}`);
  return response.data;
}

// GET books with sorting, filtering, and paging
export const getSortedFilteredPagedBooks = async (filter, page = 1, pageSize = 5, sortType = "") => {
  try {
    const params = {
      page,
      pageSize,
      sortType,
      ...filter 
    };

    // Remove null or undefined filter fields
    Object.keys(params).forEach(
      (key) => (params[key] == null || params[key] === "") && delete params[key]
    );

    const response = await AxiosConfig.get(`${BOOKS_RESOURCE}/sortFilterPage`, { params });
    return response.data; // { items, count, hasNextPage, hasPreviousPage, totalPages }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch filtered books");
  }
};

// GET sort types
export const getSortTypes = async () => {
  try {
    const response = await AxiosConfig.get(`${BOOKS_RESOURCE}/sortTypes`);
    return response.data; // return the array directly
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch sort types");
  }
};
