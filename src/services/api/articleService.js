import mockData from "@/services/mockData/articles.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let articles = [...mockData];

export const articleService = {
  async getAll() {
    await delay(300);
    return [...articles];
  },

  async getById(id) {
    await delay(250);
    return articles.find(article => article.Id === id) || null;
  },

  async create(articleData) {
    await delay(400);
    const newArticle = {
      ...articleData,
      Id: Math.max(...articles.map(a => a.Id)) + 1,
      publishDate: new Date().toISOString(),
      views: 0
    };
    articles.push(newArticle);
    return { ...newArticle };
  },

  async update(id, articleData) {
    await delay(350);
    const index = articles.findIndex(article => article.Id === id);
    if (index !== -1) {
      articles[index] = { ...articles[index], ...articleData };
      return { ...articles[index] };
    }
    throw new Error("Article not found");
  },

  async delete(id) {
    await delay(300);
    const index = articles.findIndex(article => article.Id === id);
    if (index !== -1) {
      const deleted = articles.splice(index, 1)[0];
      return deleted;
    }
    throw new Error("Article not found");
  }
};