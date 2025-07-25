import { promises as fs } from "fs";

type Peli = {
  id: number;
  title: string;
  tags: string[];
};

export class PelisCollection {
  private filePath = "./pelis.json";

  
  async getAll(): Promise<Peli[]> {
    try {
      const fileContent = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(fileContent) as Peli[];
    } catch (e) {
      return []; // Si no existe el archivo, devolver array vacío
    }
  }

  
  async add(peli: Peli): Promise<boolean> {
    const pelisActuales = await this.getAll();
    const existe = pelisActuales.some(p => p.id === peli.id);

    if (existe) {
      return false;
    }

    
    pelisActuales.push(peli);

    try {
      await fs.writeFile(this.filePath, JSON.stringify(pelisActuales, null, 2));
      return true;
    } catch (e) {
      return false;
    }
  }

  
  async getById(id: number): Promise<Peli | null> {
    const pelis = await this.getAll();
    const peli = pelis.find(p => p.id === id);
    return peli || null;
  }

  
  async search(options: { title?: string; tag?: string }): Promise<Peli[]> {
    let pelis = await this.getAll();

    if (options.title) {
      pelis = pelis.filter(p =>
        p.title.toLowerCase().includes(options.title!.toLowerCase())
      );
    }

    if (options.tag) {
      pelis = pelis.filter(p => p.tags.includes(options.tag!));
    }

    return pelis;
  }
}

