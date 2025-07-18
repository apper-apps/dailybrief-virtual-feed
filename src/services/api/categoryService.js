import mockData from "@/services/mockData/categories.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let categories = [...mockData];

export const categoryService = {
  async getAll() {
    await delay(200);
    return [...categories];
  },

  async getById(id) {
    await delay(150);
    return categories.find(category => category.Id === id) || null;
  },

  async create(categoryData) {
    await delay(300);
    const newCategory = {
      ...categoryData,
      Id: Math.max(...categories.map(c => c.Id)) + 1,
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, categoryData) {
    await delay(250);
    const index = categories.findIndex(category => category.Id === id);
    if (index !== -1) {
      categories[index] = { ...categories[index], ...categoryData };
      return { ...categories[index] };
    }
    throw new Error("Category not found");
  },

  async delete(id) {
    await delay(200);
    const index = categories.findIndex(category => category.Id === id);
    if (index !== -1) {
      const deleted = categories.splice(index, 1)[0];
      return deleted;
    }
    throw new Error("Category not found");
  }
};