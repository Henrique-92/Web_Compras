import { users, type User, type InsertUser, products, type Product, type InsertProduct } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }
  
  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db
      .insert(products)
      .values(product)
      .returning();
    return newProduct;
  }
  
  async updateProduct(id: number, updateData: Partial<InsertProduct>): Promise<Product | undefined> {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, id));
    
    if (!product) {
      return undefined;
    }
    
    const [updatedProduct] = await db
      .update(products)
      .set(updateData)
      .where(eq(products.id, id))
      .returning();
    
    return updatedProduct;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    const result = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning({ id: products.id });
    
    return result.length > 0;
  }
  
  // Initialize demonstration products in the database if none exist
  async initializeProducts() {
    const result = await db.select().from(products);
    
    if (result.length === 0) {
      const initialProducts: InsertProduct[] = [
        {
          name: "Relógio Smart Pro",
          sku: "SP-12345",
          category: "Eletrônicos",
          price: 899.99,
          stock: 128,
          status: "active",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80"
        },
        {
          name: "Tênis Runner Ultra",
          sku: "RU-67890",
          category: "Calçados",
          price: 349.90,
          stock: 56,
          status: "active",
          image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80"
        },
        {
          name: "Mochila Adventure",
          sku: "MA-54321",
          category: "Acessórios",
          price: 179.90,
          stock: 83,
          status: "low",
          image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80"
        },
        {
          name: "Fones de Ouvido MaxSound",
          sku: "MS-98765",
          category: "Eletrônicos",
          price: 249.90,
          stock: 0,
          status: "out_of_stock",
          image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80"
        }
      ];
      
      for (const product of initialProducts) {
        await this.createProduct(product);
      }
    }
  }
}

// Create instance and initialize data
const storage = new DatabaseStorage();
// Initialize the database with sample products if needed
storage.initializeProducts().catch(console.error);

export { storage };
